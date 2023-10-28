import  express  from "express";
import { protect } from '../middleware/authMiddleware.js'


import {authHotel,register,logoutHotel,verifyEmail,confirmOtp,resetPassword,getHotelUserProfile,updateHotelUserProfile} from "../controllers/hotelController.js";
const router = express.Router()

router.post('/auth',authHotel)
router.post('/register',register)
router.post('/logout',logoutHotel)
router.route('/profile')
.get(protect,getHotelUserProfile)
.put(protect,updateHotelUserProfile)
router.put('/forgotPassword',verifyEmail)
router.post('/verifyOtp',confirmOtp)
router.post('/resetPassword',resetPassword)

export default router;