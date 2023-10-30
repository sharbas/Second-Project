import mongoose from "mongoose";

const hotelDetailsSchema=mongoose.Schema({
    hotelName:{
        type:String,
        required:true
    },
    roomType:{
        type:String,
        required:true
    },
    roomPrice:{
     type:Number,
     required:true
    },
    packageLocation:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    speciality:{
        type:String,

    },
    services:{
type:String
    },
    images:  [
        {
          type: String, // Define the images field as an array of strings (image URLs)
        },
      ],
})

const HotelDetails=mongoose.model("hotelDetails", hotelDetailsSchema)

export default HotelDetails