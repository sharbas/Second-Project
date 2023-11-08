import jwt from "jsonwebtoken";
import Hotel from "../models/hotelModel.js";

const hotelAuthCheck = async (req, res, next) => {
  // Retrieve the hotelToken from the "Authorization" header
  const hotelToken = req.headers.authorization;

  if (hotelToken) {
    try {
      // Remove the "Bearer " prefix from the hotelToken (if present)
      const tokenWithoutBearer = hotelToken.replace("Bearer ", "");

      // Verify the hotelToken
      const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

      // Fetch user details and attach to the request
      req.user = await Hotel.findById(decoded.hotelId).select('-password');

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


export default hotelAuthCheck;
