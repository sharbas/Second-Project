import asyncHandler from "express-async-handler"
import Admin from '../models/adminModel.js'
import generateToken from "../utils/adminGenerateToken.js"
import User from "../models/userModel.js"
import Hotel from "../models/hotelModel.js"
import Packages from "../models/packageModel.js"


const authadmin=asyncHandler(async(req,res)=>{
        const {email,password}=req.body
   
        const admin=await Admin.findOne({email})
        if(admin && await admin.matchPassword(password)){
        const adminToken= generateToken(res,admin._id)
    
        
        res.status(201).json({
              adminToken,
                message:'login successfull'

            })
        }else{
            res.status(400).json({ message: 'Invalid mail or password' }); // Send a JSON response with an error message
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
 
    const hotelUsers=await Hotel.find({},'name email _id isBlocked')

    if(hotelUsers.length>0){
    
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


const adminLoadPackages=async(req,res)=>{
    try{
      const  packages=await Packages.find({})
        res.status(200).json(packages)

    }catch(error){
        res.status(500).json({ error: 'An error occurred while processing your request.' });

    }
}



export {authadmin,logoutAdmin,adminLoadUsers,adminLoadHotelUsers,blockUnblockUser,blockUnblockHotelUser,adminLoadPackages}
