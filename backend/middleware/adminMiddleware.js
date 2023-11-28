import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

const adminAuthCheck = async (req, res, next) => {
 
  // Retrieve the userToken from the "Authorization" header
  const adminToken = req.headers.authorization;


  if (adminToken) {
    try {


      // Remove the "Bearer " prefix from the userToken (if present)
      const tokenWithoutBearer = adminToken.replace("Bearer ", "");

      // Verify the userToken
      const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

      // Fetch user details and attach to the request
      req.user = await Admin.findById(decoded.adminId).select('-password');


      next();


    } catch (error) {
      console.error(error);
      // Define the error as an object with a message property
      const customError = { message: 'Authentication failed' };
      res.status(401).json(customError);
    }
  } else {
    // Define the error as an object with a message property
    const customError = { message: 'No token provided' };
    res.status(401).json(customError);
  }
};

export default adminAuthCheck;
