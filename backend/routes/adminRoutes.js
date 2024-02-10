import express from "express";
import adminAuthCheck from '../middleware/adminMiddleware.js'
import {
  authadmin,
  logoutAdmin,
  adminLoadUsers,
  adminLoadHotelUsers,
  blockUnblockUser,
  blockUnblockHotelUser,
  adminLoadPackages,
  adminLoadBookedTravelers,
  dashboardData
} from "../controllers/adminController.js";
import {
  addPackageDetails,
  updatePackage,
} from "../controllers/packageController.js";
import { upload } from "../middleware/multer.js";
const router = express.Router();

router.post("/auth", authadmin);
router.post("/logout", logoutAdmin);
router.get("/loadUsers",adminAuthCheck, adminLoadUsers);
router.get("/loadHotelUsers",adminAuthCheck, adminLoadHotelUsers);
router.put("/blockUnblockUser", blockUnblockUser)
router.post(
  "/addPackageDetails", // Define the route path without console.log
  upload.fields([
    { name: "categoryImages", maxCount: 1 }, // Max 1 file for category image
    { name: "images", maxCount: 5 }, // Max 3 files for package images
  ]),
  (req, res, next) => {
    console.log('its in the route of addpackagedetails'); // Move the console.log statement here
    next(); // Call next to proceed to the next middleware or handler
  },
  addPackageDetails
);

router.put("/blockUnblockHotelUser", blockUnblockHotelUser);
router.get("/adminLoadPackages",adminAuthCheck, adminLoadPackages);
router.put(
  "/updatePackage",
  upload.fields([
    { name: "categoryImages", maxCount: 1 }, // Max 1 file for category image
    { name: "images" }, // Max 3 files for package images
  ]),
  updatePackage
);
router.get('/adminLoadBookedTravelers',adminAuthCheck,adminLoadBookedTravelers)
router.get('/dashboardData',adminAuthCheck,dashboardData)

export default router;
