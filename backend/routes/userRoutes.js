import express from 'express'
import { authUser, registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,verifyEmail,confirmOtp,resetPassword,otpLoginVerifyEmail,otpLogin } from '../controllers/userController.js'
const router=express.Router()
import { protect } from '../middleware/authMiddleware.js'

router.post('/register',registerUser)
router.post('/auth',authUser)
router.post('/logout',logoutUser)
router.route('/profile')  
.get(protect,getUserProfile)
.put(protect,updateUserProfile)
router.put('/forgotPassword',verifyEmail)
router.post('/verifyOtp',confirmOtp)
router.post('/resetPassword',resetPassword)
router.post('/otpLoginVerifyEmail',otpLoginVerifyEmail)
router.post('/otpLogin',otpLogin)





export default router