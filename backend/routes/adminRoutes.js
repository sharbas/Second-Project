import express from 'express'
import {authadmin,logoutAdmin,adminLoadUsers,adminLoadHotelUsers,blockUnblockUser,blockUnblockHotelUser,adminLoadPackages} from '../controllers/adminController.js'
import {addPackageDetails,updatePackage} from '../controllers/packageController.js'
import {upload} from '../middleware/multer.js'
const router=express.Router()


router.post('/auth',authadmin)
router.post('/logout',logoutAdmin)
router.get('/loadUsers',adminLoadUsers)
router.get('/loadHotelUsers',adminLoadHotelUsers)
router.put('/blockUnblockUser',blockUnblockUser)
router.post('/addPackageDetails', upload.fields([
    { name: 'categoryImages', maxCount: 1 }, // Max 1 file for category image
    { name: 'images', maxCount: 5 }, // Max 3 files for package images
  ]), addPackageDetails);
  router.put('/blockUnblockHotelUser',blockUnblockHotelUser)
router.get('/adminLoadPackages',adminLoadPackages)
router.put('/updatePackage',upload.fields([
  { name: 'categoryImages', maxCount: 1 }, // Max 1 file for category image
  { name: 'images', maxCount: 5 }, // Max 3 files for package images
]),updatePackage)
export default router