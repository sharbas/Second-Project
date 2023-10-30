
import Packages from '../models/packageModel.js'
import asyncHandler from "express-async-handler"

const addPackageDetails = asyncHandler(async (req, res) => {
    console.log('Adding a new package...');
    const {
      category,
      place,
      shortDescription,
      detailedDescription,
      duration,
      price,
    } = req.body; // Use req.body to access the form data

    const categoryExists=await Packages.findOne({category})
    const placeExists=await Packages.findOne({place})
    if(categoryExists){
        res.status(409).json({message:'this category is already exist'})
        if(placeExists){
            res.status(409).json({message:'this place is already exist'})
        }
    }
    console.log(req.files,'this is req.files');
    const images=req.files
    console.log(images,'this is images ');
    const imagePaths=images.map((image)=>image.path)
  
    const packg=await Packages.create({
    category,
    place,
    shortDescription,
    detailedDescription,
    duration,
    price,
    images:imagePaths

  })

  
    console.log('Category:', category);
    // Handle the form data here
  
    // Respond to the client, e.g., with a success message
    res.status(200).json({ message: 'Package details added successfully' });
  });
  

export {
    addPackageDetails
}