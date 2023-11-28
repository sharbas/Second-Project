import mongoose from "mongoose";

const wishlistSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Hotel model
     
    },
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Packages', // Reference to the Hotel model
     
    },

})

const Wishlist = mongoose.model('Wishlist',wishlistSchema)

export default Wishlist;