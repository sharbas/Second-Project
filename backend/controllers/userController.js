import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import sendResetMail from '../utils/nodeMailer.js'
import Packages  from '../models/packageModel.js'
import constants from './constants/constants.js'

const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            
            const userToken = generateToken(res, user._id);
            if (user.isBlocked === true) {
                res.status(403).json({ message: constants.USER_BLOCKED });
               
            }
            res.status(201).json({ userToken,message:constants.LOGIN_SUCCESS });
        } else {
            res.status();
            res.status(401).json({ message:constants.INVALID_EMAIL_OR_PASSWORD });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};

const registerUser = async (req, res) => {
    try {
      
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({message:constants.USER_ALREADY_EXIST})
          
        }

        // Password validation
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!password.match(passwordRegex)) {
            res.status(400).json({message:constants.PASSWORD_SECURITY})
        }

        let userToken;

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            userToken = generateToken(res, user._id);
            res.status(201).json({ userToken });
        } else {
            res.status(401).json({message:constants.INVALID_EMAIL_OR_PASSWORD})
            
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        const token1 = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiration = new Date(Date.now() + 1 * 120 * 1000);
        if (user) {
            user.otp = token1;
            user.otpExpiration = otpExpiration;
            await user.save();
            sendResetMail(user.name, email, user.otp);
            res.status(200).json('its working');
        } else {
            res.status(400).json({message:constants.USER_NOT_FOUND});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};

const confirmOtp = async (req, res) => {
    try {
        const { state, otp } = req.body;
        const user = await User.findOne({ email: state });
        if (user.otp == otp) {
            res.status(200).json('Successful');
        } else {
            res.status(400).json("Incorrect otp");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { state, password } = req.body;
        const user = await User.findOne({ email: state });
        if (user) {
            user.password = password;
            await user.save();
            res.status(200).json('success');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};

const otpLoginVerifyEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.find({ email });
        const token1 = Math.floor(100000 + Math.random() * 900000).toString();
        if (user) {
            user.otp = token1;
            await user.save();
            sendResetMail(user.name, email, user.otp);
            res.status(200).json('Successful');
        } else {
            res.status(400).json('Invalid Email');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};

const otpLogin = async (req, res) => {
    try {
        const { state, otp } = req.body;
        const user = await User.findOne({ email: state });
        if (user.otp == otp) {
            res.status(201).json({ _id: user._id, name: user.name, email: user.email });
        } else {
            res.status(400).json('Incorrect Otp');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};

const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'User logged out' });
};



const getUserProfile = async (req, res) => {
    try {
        const myProfile=req.user
        res.status(200).json({ myProfile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};



const updateUserProfile = async (req, res) => {

    try {
        const imagePath = req.file.filename; // Access profileImage from the request body
        const user = await User.findById(req.user._id);
        const userToken = generateToken(res, user._id);
  
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.profileImage=imagePath ||  user.profileImage
            if (req.body.password) {
                user.password = req.body.password;
            }
            const updatedUser = await user.save();
            
            res.status(200).json({
                userToken
            });
       
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};

const loadPackages = async (req, res) => {
    try {
        const packages = await Packages.find({}).select('category categoryImages');
        res.status(200).json({ packages, message: 'packages loaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};


const loadPlacesData = async (req, res) => {
    try {
        req.params.category;
        const placeDetails = await Packages.find({ category: req.query.category });
        res.status(200).json(placeDetails);
    } catch (error) {
        // Handle the exception here (log, return an error response, etc.)
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};


const loadFullDetails=async(req,res)=>{
    try{
       const category= req.query.category
       const place= req.query.place
       const fullDetails=await Packages.find({$and:[{category:category},{place:place}]})
       
res.status(200).json(fullDetails)
    }catch(error){
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
}




export{
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    verifyEmail,
    confirmOtp,
    resetPassword,
    otpLoginVerifyEmail,
    otpLogin,
    loadPackages,
    loadPlacesData,
    loadFullDetails

}