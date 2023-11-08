import asyncHandler from  "express-async-handler"
import Hotel from '../models/hotelModel.js'

import hotelGenerateToken from "../utils/hotelGenerateToken.js"
import sendResetMail from "../utils/nodeMailer.js"



  const authHotel = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const hotel = await Hotel.findOne({ email });
    if (hotel && (await hotel.matchPassword(password))) {
      // Authentication successful
      const hotelToken= hotelGenerateToken(res, hotel._id);
      if(hotel.isBlocked===true){
        res.status(403).json({message:'you are blocked'})
    }
      res.status(201).json({
       
     
        hotelToken,
        message: 'Authentication successful',
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    // Handle other errors
    res.status(500).json({ message: "Internal server error" });
  }
});


  const  register=asyncHandler(async(req,res)=>{
        const {name,email,password}=req.body
        const hotelExists=await Hotel.findOne({email})

        if(hotelExists){
            res.status(400)
            throw new Error("User already exists")
        }
              // Password validation
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!password.match(passwordRegex)) {
    res.status(400);
    throw new Error('Password must contain 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 digit.');
  }
        const hotel=await Hotel.create({
            name,
            email,
            password
        })
        hotelGenerateToken(res,hotel._id)
        res.status(201).json({
         _id:hotel._id,
         name:hotel.name,
         email:hotel.email
        })
    })


    const verifyEmail=asyncHandler(async(req,res)=>{
        const {email}=req.body
        const hotel=await Hotel.findOne({email})
        const token1 = Math.floor(100000 + Math.random() * 900000).toString()
        const otpExpiration=new Date(Date.now()+1*120*1000)
        if(hotel){

            hotel.otp=token1
            hotel.otpExpiration=otpExpiration
            await hotel.save()
            sendResetMail(hotel.name,email,hotel.otp)
        
            res.status(200).json('its working')
        }else{
        
            res.status(400).json("User not found")
        }
            
        })
        
        
        const confirmOtp=asyncHandler(async(req,res)=>{
      
        const {state,otp}=req.body
        const hotel=await Hotel.findOne({email:state})
        if(hotel.otp==otp){
            res.status(200).json('Successfull')
        }else{
            res.status(400).json("Incorrect otp")
        }
            
        })
        
        
        const resetPassword=asyncHandler(async(req,res)=>{
      
            const {state,password}=req.body
          
            const hotel=await Hotel.findOne({email:state})
            if(hotel){
                hotel.password=password
                await hotel.save()
                res.status(200).json('success')
            }
        })
        

    const logoutHotel=asyncHandler(async(req,res)=>{
        res.cookie('htljwt','',{
            http:true,
            expires:new Date(0)
        })
        res.status(200).json({message:'Logout Hotel Successfull'})
    })



    const getHotelUserProfile=asyncHandler(async(req,res)=>{
      const hotel={
          _id:req.hotel._id,
          name:req.hotel.name,
          email:req.hotel.email
      }
          res.status(200).json({user})
      })


    const updateHotelUserProfile=asyncHandler(async(req,res)=>{
 
  const hotel=await Hotel.findById(req.hotel._id)
  
  if(hotel){
  hotel.name=req.body.name || hotel.name
  hotel.email=req.body.email || hotel.email
  if(req.body.password){
      hotel.password=req.body.password
  }
      const updatedhotel=await hotel.save()
      res.status(200).json({
          _id:updatedhotel._id,
          name:updatedhotel.name,
          email:updatedhotel.email
      })
  }else{
      res.status(404)
      throw new Error('User not found')
  }
  })


export {
    authHotel,
    register,
    logoutHotel,
    verifyEmail,
    confirmOtp,
    resetPassword,
    getHotelUserProfile,
    updateHotelUserProfile
}