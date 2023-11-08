import mongoose from "mongoose";

const packageSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  categoryImages:
    {
      type:String
    },
  
  place: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  detailedDescription: {
    type: String,
    required: true,
  },
  images:  [
    {
      type: String, // Define the images field as an array of strings (image URLs)
    },
  ],
  duration:{
type:String,
required:true
  },
  price:{
    type:Number,
    required:true
  }
});

const Packages = mongoose.model('Package', packageSchema);

 export default Packages;
