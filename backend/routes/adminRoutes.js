import express from 'express'
import {authadmin,logoutAdmin,adminLoadUsers,blockUnblockUser} from '../controllers/adminController.js'

const router=express.Router()

router.post('/auth',authadmin)
router.post('/logout',logoutAdmin)
router.get('/loadUsers',adminLoadUsers)
router.put('/blockUnblockUser',blockUnblockUser)
export default router