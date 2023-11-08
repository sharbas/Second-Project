import express from 'express'
import { authUser, registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,verifyEmail,confirmOtp,resetPassword,otpLoginVerifyEmail,otpLogin,loadPackages,loadPlacesData,loadFullDetails } from '../controllers/userController.js'
const router=express.Router()
import { protect } from '../middleware/authMiddleware.js'
import  userAuthCheck from '../middleware/userMiddleware.js'
import {upload} from '../middleware/multer.js'




router.post('/register',registerUser)
router.post('/auth',authUser)
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






export default router