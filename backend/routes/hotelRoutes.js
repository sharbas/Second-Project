import  express  from "express";
import { protect } from '../middleware/authMiddleware.js'
import {upload} from '../middleware/multer.js'
import hotelAuthCheck from '../middleware/hotelMiddleware.js'

import {authHotel,register,logoutHotel,verifyEmail,confirmOtp,resetPassword,getHotelUserProfile,updateHotelUserProfile} from "../controllers/hotelController.js";
import { addHotelDetails ,loadHotel,updateDetails} from "../controllers/hotelDetailsController.js";
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
router.post('/addHotelDetails',hotelAuthCheck,upload.array('images'),addHotelDetails)
router.get('/loadHotel',hotelAuthCheck,loadHotel)
router.put('/updateDetails',updateDetails)
export default router;