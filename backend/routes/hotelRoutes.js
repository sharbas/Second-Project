import  express  from "express";
import { protect } from '../middleware/authMiddleware.js'
import {upload} from '../middleware/multer.js'
import hotelAuthCheck from '../middleware/hotelMiddleware.js'
import {sendChat,getHotelRooms,getMessages} from '../controllers/chatController.js'
import {authHotel,register,logoutHotel,verifyEmail,confirmOtp,resetPassword,getHotelUserProfile,updateHotelUserProfile,dashboardData} from "../controllers/hotelController.js";
import { addHotelDetails ,loadHotel,updateDetails,fetchLocation} from "../controllers/hotelDetailsController.js";
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
router.get('/fetchLocation',fetchLocation)
router.post('/addHotelDetails',hotelAuthCheck,upload.array('images'),addHotelDetails)
router.get('/loadHotel',hotelAuthCheck,loadHotel)
router.put('/updateDetails',updateDetails)

router.get('/get-hotel-rooms',hotelAuthCheck,getHotelRooms)
router.post('/sendchat/:chatid/:type',hotelAuthCheck,sendChat)
router.get('/get-room-messages/:roomid',getMessages)
router.get('/dashboardData',hotelAuthCheck,dashboardData)

export default router;