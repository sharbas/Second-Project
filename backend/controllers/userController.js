import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import sendResetMail from '../utils/nodeMailer.js'


// @desc Auth user/set token
//route POST /api/users/auth
// @access Public
const authUser=asyncHandler(async(req,res)=>{
const {email,password}=req.body
const user=await User.findOne({email})
if(user && (await user.matchPassword(password))){
    console.log('hai sharbas this is user auth');
  const userToken=  generateToken(res,user._id)
    if(user.isBlocked===true){
        res.status(403).json({message:'you are blocked'})
        console.log('blocked is working');
    }
    res.status(201).json({
        userToken
    })
}else{
   res.status(401)
   throw new Error('Invalid email or password user') 
}

    res.status(200).json({message:"Auth User"})
})


// @desc register user
//route POST /api/users/register
// @access Public


const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    const userExists=await User.findOne({email})
    if(userExists){
        res.status(400)
        console.log(name,email,password,'user exist ');
        throw new Error('User already exists backend')
    }
      // Password validation
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!password.match(passwordRegex)) {
    res.status(400);
    throw new Error('Password must contain 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 digit.');
  }
const user=await User.create({
    name,
    email,
    password
})
if(user ){
   const userToken= generateToken(res,user._id)
    res.status(201).json({
        userToken
    })
}else{
   res.status(401)
   throw new Error('Invalid emial or password') 
}
  
})

const verifyEmail=asyncHandler(async(req,res)=>{
const {email}=req.body
const user=await User.findOne({email})
const token1 = Math.floor(100000 + Math.random() * 900000).toString()
const otpExpiration=new Date(Date.now()+1*120*1000)
if(user){
    user.otp=token1
    user.otpExpiration=otpExpiration
    await user.save()
    sendResetMail(user.name,email,user.otp)
    console.log(email,'hai verifyemail');
    res.status(200).json('its working')
}else{
    res.status(400).json("User not found")
}
    
})


const confirmOtp=asyncHandler(async(req,res)=>{
const {state,otp}=req.body
const user=await User.findOne({email:state})
if(user.otp==otp){
    res.status(200).json('Successfull')
}else{
    res.status(400).json("Incorrect otp")
}
    
})


const resetPassword=asyncHandler(async(req,res)=>{
    const {state,password}=req.body
    console.log(state,'pass',password);
    const user=await User.findOne({email:state})
    if(user){
        user.password=password
        await user.save()
        res.status(200).json('success')
    }
})

const otpLoginVerifyEmail=asyncHandler(async(req,res)=>{
    const {email}=req.body
    const user=await User.find({email})
    const token1=Math.floor(100000 + Math.random() * 900000).toString()
    if(user){
        user.otp=token1
        await user.save()
        sendResetMail(user.name,email,user.otp)
        res.status(200).json('Successfull')

    }else{
        res.status(400).json('Invalid Email')
    }
})

const otpLogin=asyncHandler(async(req,res)=>{
    const {state,otp}=req.body
    const user=await User.findOne({email:state})
    if(user.otp==otp){
        res.status(201).json({_id:user._id,name:user.name,email:user.email})
    }else{
        res.status(400).json('Incorrect Otp')
    }
})



// @desc logout user
//route POST /api/users/logout
// @access Public
const logoutUser=asyncHandler(async(req,res)=>{
res.cookie('jwt','',{
    httpOnly:true,
    expires:new Date(0)
})
res.status(200).json({message:'User logged out'})
})


// @desc get user profile
//route GET /api/users/profile
// @access Private
const getUserProfile=asyncHandler(async(req,res)=>{
const user={
    _id:req.user._id,
    name:req.user.name,
    email:req.user.email
}
    res.status(200).json({user})
})


// @desc update user profile
//route POST /api/users/profile
// @access Private
const updateUserProfile=asyncHandler(async(req,res)=>{
    console.log(req.body.email,req.body.name );
const user=await User.findById(req.user._id)

if(user){
user.name=req.body.name || user.name
user.email=req.body.email || user.email
if(req.body.password){
    user.password=req.body.password
}
    const updatedUser=await user.save()
    res.status(200).json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email
    })
}else{
    res.status(404)
    throw new Error('User not found')
}
})


export{
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    verifyEmail,
    confirmOtp,
    resetPassword,
    otpLoginVerifyEmail,
    otpLogin


}