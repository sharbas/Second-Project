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
    price:{
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
    phone:{
        type:Number,
        required:true
    },
    speciality:{
        type:String,

    },
    images:  [
        {
          type: String, // Define the images field as an array of strings (image URLs)
        },
      ],
})

const HotelDetails=mongoose.model("hotelDetails", hotelDetailsSchema)

module.exports=HotelDetails