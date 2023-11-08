
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
  
      const { category, place, shortDescription, detailedDescription, duration, price,images } = req.body;
      const Images = req.files['images'];
      const imagePaths = Images.map((image) => image.filename);
      const categoryImage = req.files['categoryImages'][0].filename;
  
      const updatePackageDetails = {
        category: category,
        categoryImages: categoryImage ? categoryImage : tourPackage.categoryImages,
        place: place,
        shortDescription: shortDescription,
        detailedDescription: detailedDescription,
        duration: duration,
        price: price,
        images: imagePaths ? imagePaths : tourPackage.images,
        _id: req.body._id
      };
      const saveDetails = await Packages.findByIdAndUpdate({_id:req.body._id, updatePackageDetails}, { new: true });
  
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