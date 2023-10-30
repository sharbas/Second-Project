import  express  from "express";
import { protect } from '../middleware/authMiddleware.js'
import {upload} from '../middleware/multer.js'

import {authHotel,register,logoutHotel,verifyEmail,confirmOtp,resetPassword,getHotelUserProfile,updateHotelUserProfile} from "../controllers/hotelController.js";
import { addHotelDetails } from "../controllers/hotelDetailsController.js";
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
router.post('/addHotelDetails', upload.array('images'),addHotelDetails)

export default router;