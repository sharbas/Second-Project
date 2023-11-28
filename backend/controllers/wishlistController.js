import Packages from "../models/packageModel.js";
import Wishlist from "../models/wishlistModel.js";

const addToWishlist=async(req,res)=>{
    try{
        const userId=req.user._id
        const packageId=req.query.packageId
        const alreadyInWishlist = await Wishlist.findOne({ userId: userId, packageId: packageId });
        if(alreadyInWishlist){
            res.status(400).json({message:'This place is already added in your wishlist'})
        }


       const wishPackage=await Wishlist.create({
        userId:userId,
        packageId:packageId
       })
    
       console.log(wishPackage,'this is wishlist');
        res.status(200).json({wishPackage,message:"liked"})
    }catch(error){
        
    } 
}

const removeFromWishlist=async(req,res)=>{
    try {
        // Assuming you have a Mongoose model named Wishlist
        const deletedWishlistItem = await Wishlist.deleteOne({
          packageId: req.query.packageId,
          userId: req.user._id,
        });
    
        if (deletedWishlistItem.deletedCount === 1) {
          // Document successfully deleted
          return res.status(200).json({ message: 'Wishlist item deleted successfully' });
        } else {
          // Document not found or not deleted
          return res.status(404).json({ message: 'Wishlist item not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

const getWishlist=async(req,res)=>{
try{
    


const userWishlist=await Wishlist.find({userId:req.user._id})
console.log(userWishlist,'this is user wishlist');
res.status(200).json({userWishlist})
}catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}
}

const deleteWishlist=async(req,res)=>{
    try{
        console.log(req.user._id,'req.user._id');
      console.log(  req.query.packageId,'  req.query.packageId');
      const deleteWishlist=await Wishlist.deleteOne({userId:req.user._id,packageId:req.query.packageId})

      res.status(200).json({message:'successfully deleted'})

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });  
    }
}

const wishlistOfUser = async (req, res) => {
    try {
      const wishlistItems = await Wishlist.find({ userId: req.user._id });
  
      console.log(wishlistItems, 'this is wishlistOfUser');
  
      const packageIds = wishlistItems.map((wishlistItem) => wishlistItem.packageId);
  
      // Use $in to find packages with any of the packageIds
      const packages = await Packages.find({ _id: { $in: packageIds } }).select('category place images');
  
      console.log('this is packages', packages);
  
      res.status(200).json(packages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

export {
    addToWishlist,
    removeFromWishlist,
    getWishlist,
    wishlistOfUser,
    deleteWishlist
}