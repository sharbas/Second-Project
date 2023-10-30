import HotelDetails from "../models/hotelDetailsModel.js"
import asyncHandler from  "express-async-handler"

const addHotelDetails=asyncHandler(async(req,res)=>{
    console.log('this addHoteldetails',req.body);

    const { hotelName,roomType,roomPrice,packageLocation, address,contactNumber,speciality, services}= req.body
    console.log(hotelName,'this is hotelName');

const hotelNameExists=await HotelDetails.findOne({hotelName})
if(hotelNameExists){
    res.status(409).json({message:'this hotelName is already exist'})
}
if (!packageLocation) {
    return res.status(400).json({ message: 'packageLocation is required' });
  }
console.log(req.files,'this is req.files');
const images=req.files
console.log(images,'this is images ');
const imagePaths=images.map((image)=>image.path)

const htlDetails=await HotelDetails.create({
    hotelName,
    roomType,
    roomPrice,
    packageLocation,
     address,
     contactNumber,
    speciality, 
    services,
    images:imagePaths
})
res.status(200).json({ message: 'Hotel details added successfully' });
})


export {
    addHotelDetails
}