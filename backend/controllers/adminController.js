import asyncHandler from "express-async-handler"
import Admin from '../models/adminModel.js'
import generateToken from "../utils/adminGenerateToken.js"
import User from "../models/userModel.js"


const authadmin=asyncHandler(async(req,res)=>{
        const {email,password}=req.body
        console.log(req.body,'body');
        console.log(email,'dfkjd');
        
        const admin=await Admin.findOne({email})
        if(admin && await admin.matchPassword(password)){
            generateToken(res,admin._id)
            res.status(201).json({
                _id:admin._id,
                email:admin.email
            })
        }else{
            res.status(400)
            console.log('this is else');
            throw new Error('Invalid mail or password admin')

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
    if(users){
        res.status(201).json({users})
    }else{
        res.status(404).json('Not found');
    }
})

const blockUnblockUser=asyncHandler(async(req,res)=>{
   const {userId,isBlocked}=req.body
   const user=await User.updateOne({_id:userId},{$set:{isBlocked:isBlocked}})

})


export {authadmin,logoutAdmin,adminLoadUsers,blockUnblockUser}
