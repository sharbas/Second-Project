import  express  from "express";

import hotelController from "../controllers/hotelController.js";
const router = express.Router()

router.post('/auth',hotelController.authHotel)
router.post('/register',hotelController.register)
router.post('/logout',hotelController.logoutHotel)

export default router;