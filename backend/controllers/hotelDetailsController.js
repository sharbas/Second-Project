import HotelDetails from "../models/hotelDetailsModel.js"
import asyncHandler from  "express-async-handler"
import Hotel from '../models/hotelModel.js'
import Packages from '../models/packageModel.js'
const addHotelDetails = asyncHandler(async (req, res) => {
    try {
  
      const { hotelName, roomType, roomPrice, packageLocation, address, contactNumber, speciality, services } = req.body;
     
  
      const hotelNameExists = await HotelDetails.findOne({ hotelName });
      if (hotelNameExists) {
        return res.status(409).json({ message: 'This hotelName is already in use' });
      }
  
      if (!packageLocation) {
        return res.status(400).json({ message: 'packageLocation is required' });
      }
  
      const images = req.files;
      const imagePaths = images.map((image) => image.filename);
  
      const htlDetails = await HotelDetails.create({
        hotelUserId: req.user._id,
        hotelName,
        roomType,
        roomPrice,
        packageLocation,
        address,
        contactNumber,
        speciality,
        services,
        images: imagePaths,
      });
  
      res.status(200).json({ message: 'Hotel details added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while adding hotel details' });
    }
  });
  

  const fetchLocation=async(req,res)=>{
    try{
      const location=await Packages.find({},{_id:0,place:1})
res.status(200).json({location})

    }catch(error){
      res.status(500).json({ message: 'An error occurred while adding hotel details' });

    }

  }

const loadHotel=asyncHandler(async(req,res)=>{
   const hotel=await HotelDetails.find({
    hotelUserId:req.user._id})
   const hotelUser=await Hotel.find({_id:req.user._id})
    if(hotel){
        res.status(200).json({hotel:hotel,hotelUser })

    }else{
        res.status(404).json({hotelUser})
    } 
     
})   

const updateDetails = asyncHandler(async (req, res) => {
    try {
      const {
        hotelName,
        roomType,
        roomPrice,
        packageLocation,
        address,
        contactNumber,
        speciality,
        services,
       
      } = req.body;

        
        
        

      const updatedHotelDetails = await HotelDetails.updateOne(
        { _id: req.body._id },
        {
          $set: {
            hotelName: hotelName,
            roomType: roomType,
            roomPrice: roomPrice,
            packageLocation: packageLocation,
            address: address,
            contactNumber: contactNumber,
            speciality: speciality,
            services: services,
          },
        }
      );

  
      res.status(200).json({ message: 'Hotel details updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the hotel details' });
    }
  });
  

export {
    addHotelDetails,
    fetchLocation,
    loadHotel,
    updateDetails 
}