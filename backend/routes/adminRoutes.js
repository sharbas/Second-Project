import express from 'express'
import {authadmin,logoutAdmin,adminLoadUsers,adminLoadHotelUsers,blockUnblockUser,blockUnblockHotelUser} from '../controllers/adminController.js'

const router=express.Router()

router.post('/auth',authadmin)
router.post('/logout',logoutAdmin)
router.get('/loadUsers',adminLoadUsers)
router.get('/loadHotelUsers',adminLoadHotelUsers)
router.put('/blockUnblockUser',blockUnblockUser)
router.put('/blockUnblockHotelUser',blockUnblockHotelUser)
export default router