import asyncHandler from "express-async-handler"
import Admin from '../models/adminModel.js'
import generateToken from "../utils/adminGenerateToken.js"
import User from "../models/userModel.js"
import Hotel from "../models/hotelModel.js"


const authadmin=asyncHandler(async(req,res)=>{
        const {email,password}=req.body
        console.log(req.body,'body');
        console.log(email,'dfkjd');
        console.log('working')
        const admin=await Admin.findOne({email})
        if(admin && await admin.matchPassword(password)){
        const adminToken= generateToken(res,admin._id)
           console.log('token',adminToken)
        
        res.status(201).json({
              adminToken,
                message:'login successfull'

            })
        }else{
            res.status(400).json({ message: 'Invalid mail or password' }); // Send a JSON response with an error message
            console.log('this is else');
            throw new Error('Invalid mail or password admin');

        }
    })

   const logoutAdmin=asyncHandler(async(req,res)=>{
        res.cookie('admnjwt','',{
            httpOnlyP:true,
            expires:new Date(0)
        })
        res.status(200).json({message:'Logout Admin success'})
    })

const adminLoadUsers=asyncHandler(async(req,res)=>{
    const users=await User.find({},'name email _id isBlocked')
    
    if(users.length>0){
 

        res.status(201).json({users})
    }else{
        res.status(404).json('Not found');
    }
})

const adminLoadHotelUsers=asyncHandler(async(req,res)=>{
    console.log('this is adminLoadHotelUsers');
    const hotelUsers=await Hotel.find({},'name email _id isBlocked')
    console.log(hotelUsers,'hotelUsers');
    if(hotelUsers.length>0){
        console.log('this is if of hoteluser.length');
res.status(201).json({hotelUsers})
    }else{
        res.status(404).json('Not found')
    }
})

const blockUnblockHotelUser=asyncHandler(async(req,res)=>{
    const {userId,isBlocked}=req.body
    const hotelUser=await User.UpdateOne({_id:userId},{$set:{isBlocked:isBlocked}})
    res.status(200)
})

const blockUnblockUser=asyncHandler(async(req,res)=>{
   const {userId,isBlocked}=req.body
   const user=await User.updateOne({_id:userId},{$set:{isBlocked:isBlocked}})

})




export {authadmin,logoutAdmin,adminLoadUsers,adminLoadHotelUsers,blockUnblockUser,blockUnblockHotelUser}
