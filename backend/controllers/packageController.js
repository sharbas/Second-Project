
import Packages from '../models/packageModel.js'
import asyncHandler from "express-async-handler"

const addPackageDetails = asyncHandler(async (req, res) => {

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
    if(categoryExists && placeExists){
        
    
            res.status(409).json({message:'this place is already exist in the same category'})
     
    }
    const images=req.files['images']
    const imagePaths=images.map((image)=>image.filename)
    const categoryImage =  req.files['categoryImages'][0].filename;
    // const categoryImages=req.files
    // const categoryImagePath=categoryImages.map((image)=>image.filename)
  
    const packg=await Packages.create({
    category,
    categoryImages:categoryImage,
    place,
    shortDescription,
    detailedDescription,
    duration,
    price,
    images:imagePaths

  })

  
    // Handle the form data here
  
    // Respond to the client, e.g., with a success message
    res.status(200).json({ message: 'Package details added successfully' });
  });
  

  const updatePackage = async (req, res) => {
    try {
      const { category, place, shortDescription, detailedDescription, duration, price } = req.body;
      const Images = req.files['images'];
      const imagePaths = Images.map((image) => image.filename);
  
      const tourPackage = await Packages.findOne({ _id: req.body._id });
  
      const categoryImage = req.files['categoryImages'][0].filename;
  
      const updatePackageDetails = {
        category: category ? category : tourPackage.category,
        place: place ? place : tourPackage.place,
        shortDescription: shortDescription ? shortDescription : tourPackage.shortDescription,
        detailedDescription: detailedDescription ? detailedDescription : tourPackage.detailedDescription,
        duration: duration ? duration : tourPackage.duration ,
        price: price ? price : tourPackage.price,
        images: imagePaths ? imagePaths : tourPackage.images,
        categoryImages: categoryImage ? categoryImage : tourPackage.categoryImages,
      };
  
      // Remove _id from the update object
      delete updatePackageDetails._id;
  
      const saveDetails = await Packages.findByIdAndUpdate(
        req.body._id, // Use the ID to identify the document to update
        updatePackageDetails, // Update object
        { new: true }
      );
      if (saveDetails) {
        res.status(200).json({ message: 'Package updated successfully', saveDetails });
      } else {
        res.status(404).json({ error: 'Document not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  }
  
  

export {
    addPackageDetails,
    updatePackage
}