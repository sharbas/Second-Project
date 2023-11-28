import mongoose from "mongoose";

const bookedTravelersSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Packages', // Reference to the Packages model
  },
  hotelId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'HotelDetails'
  },
  address:{
    type:String
  },
  country:{
type:String
  },
  email:{
    type:String
  },
  flightDateAndTime:{
type:Date
  },
  travelers: [
    {
      travelerName: {
        type: String,
      },
      passportNumber: {
        type: String,
      },
      dob: {
        type: Date,
      },
      phone: {
        type: Number,
      },
      gender: {
        type: String,
      },
      photo: {
        type: String,
      },
      passportFrontPhoto: {
        type: String,
      },
      passportBackPhoto: {
        type: String,
      },
      
    }
  ],
  packagePrice:{
type:Number
  },
  hotelPrice:{
type:Number
  },
  totalMembers:{
    type:Number
  },
  totalAmountOfPackage:{
    type:Number
  },
  totalAmount:{
    type:Number
  },

});

const BookedTravelers = mongoose.model('BookedTravelers', bookedTravelersSchema);

export default BookedTravelers;
