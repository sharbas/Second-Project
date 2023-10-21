import asyncHandler from  "express-async-handler"
import Hotel from '../models/hotelModel.js'

import generateToken from "../utils/hotelGenerateToken.js"



const hotelController={
    authHotel:asyncHandler(async(req,res)=>{
        const {email,password}=req.body
        const hotel=await Hotel.findOne(email)
        if(hotel && await hotel.matchPassword(password)){
            generateToken(res,hotel._id)
            res.status(201).json({
                _id:hotel._id,
                email:hotel.email
            })
        }else{

        }
    }),
    register:asyncHandler(async(req,res)=>{
        console.log('hai hotel is here in the register');
        const {name,email,password}=req.body
        const hotelExists=await Hotel.findOne({email})

        if(hotelExists){
            res.status(400)
            throw new Error("User already exists")
        }
        const hotel=await Hotel.create({
            name,
            email,
            password
        })
        generateToken(res,hotel._id)
        res.status(201).json({
         _id:hotel._id,
         name:hotel.name,
         email:hotel.email
        })
    }),

    logoutHotel:asyncHandler(async(req,res)=>{
        res.cookie('htljwt','',{
            http:true,
            expires:new Date(0)
        })
        res.status(200).json({message:'Logout Doctor success'})
    })
}

export default hotelController