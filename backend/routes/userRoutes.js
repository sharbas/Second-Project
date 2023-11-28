import express from 'express'
import { authUser, registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,verifyEmail,confirmOtp,resetPassword,otpLoginVerifyEmail,otpLogin,
    loadPackages,loadPlacesData,loadFullDetails,mainUserDetails,fetchHotelAndPackagedDetails,
    bookPackageAndHotel,getSearchItem,MyBookedDetails,googleLogin ,googleAuth} from '../controllers/userController.js'

const router=express.Router()
import {addToWishlist,removeFromWishlist,getWishlist,wishlistOfUser,deleteWishlist} from '../controllers/wishlistController.js'
import  userAuthCheck from '../middleware/userMiddleware.js'
import {upload} from '../middleware/multer.js'
import {createRoom,sendChat,getRooms,getMessages} from '../controllers/chatController.js'



router.post('/register',registerUser)
router.post('/auth',authUser)
router.post('/g-login',googleLogin)
router.post('/oauth',googleAuth)//Google Sign Up
router.post('/logout',logoutUser)
router.route('/profile')  
.get(userAuthCheck,getUserProfile)
.put(userAuthCheck,upload.single('image'),updateUserProfile)
router.put('/forgotPassword',verifyEmail)
router.post('/verifyOtp',confirmOtp)
router.post('/resetPassword',resetPassword)
router.post('/otpLoginVerifyEmail',otpLoginVerifyEmail)
router.post('/otpLogin',otpLogin)
router.get('/packages',userAuthCheck,loadPackages)
router.get('/loadPlacesData',loadPlacesData)
router.get('/loadFullDetails',loadFullDetails)
router.get('/wishlist',userAuthCheck,wishlistOfUser)
router.delete('/wishlist',userAuthCheck,deleteWishlist)
router.get('/getWishlist',userAuthCheck,getWishlist)
router.post('/addToWishlist',userAuthCheck,addToWishlist)
router.delete('/removeFromWishlist',userAuthCheck,removeFromWishlist)
router.post('/mainUserDetails',userAuthCheck,mainUserDetails)
router.get('/fetchHotelAndPackagedDetails',fetchHotelAndPackagedDetails)
router.post(
    '/bookPackageAndHotel',
    upload.fields([
      { name: 'clientPhotos'},
      { name: 'passportFrontPhotos'},
      { name: 'passportBackPhotos'},
    ]),
    bookPackageAndHotel
  );
router.post('/get-or-createroom',userAuthCheck,createRoom)
router.post('/sendchat/:chatid/:type',userAuthCheck,sendChat)
router.get('/getrooms',userAuthCheck,getRooms)
router.get('/get-room-messages/:roomid',getMessages)
router.get('/packages/search',getSearchItem)
router.get('/myBookedDetails',userAuthCheck,MyBookedDetails)



export default router