import BookedTravelers from "../models/bookedTravelers.js";
import Packages from '../models/packageModel.js'
import HotelDetails from '../models/hotelDetailsModel.js'
import User from "../models/userModel.js";

const bookedTravelers=async(req,res)=>{
    try{
       

    }catch(error){

    }
}


const loadHotelForTravelers=async(req,res)=>{
    try{
      const hotelDetails=await HotelDetails({})

    }catch(error){


    }
}

export {
    bookedTravelers,
    loadHotelForTravelers
}