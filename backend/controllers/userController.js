import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import sendResetMail from '../utils/nodeMailer.js'
import Packages  from '../models/packageModel.js'
import constants from './constants/constants.js'
import BookedTravelers from '../models/bookedTravelers.js'
import HotelDetails from '../models/hotelDetailsModel.js'
import jwt from 'jsonwebtoken'
import stripe from "stripe";
const stripeInstance = stripe("sk_test_51OChr2SCTDTk7maXA91imN9nEe1e40IASLu8a7D3eLYffEtEkHV8ifEygDkOW2JAtsL6rCNx2OuBrrFueNzs15Js00NVgJwtbW");

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
            return res.status(400).json({message:constants.USER_ALREADY_EXIST})
          
        }

        // Password validation
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!password.match(passwordRegex)) {
            return res.status(400).json({message:constants.PASSWORD_SECURITY})
        }

        let userToken;

        const user = await User.create({
            name,
            email,
            password,
        });

console.log('abcddddddddddd');
        if (user){
            console.log(user);
          
            return res.status(201)
        } else {
            return res.status(401).json({message:constants.INVALID_EMAIL_OR_PASSWORD})
            
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while processing your request.' });
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
        const packages = await Packages.find({}).select('category categoryImages _id');
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

const mainUserDetails=async(req,res)=>{
try{
    const userId=req.user._id
    const packageId = await Packages.findOne( {category: req.query.category, place: req.query.place},'_id');
    const {address,country,members,email}=req.body


const userDetails=await BookedTravelers.create({
    userId:userId,
    packageId:packageId,
    address:address,
    country:country,
    email:email,
    members:members


})
console.log(userDetails._id,'userdetailssssss');
res.status(200).json({message:'the first details added successfully',bookedUserId:userDetails._id})





}catch(error){

}
}


const fetchHotelAndPackagedDetails=async(req,res)=>{
try{
     const hotelDetails=await HotelDetails.find({
      
        packageLocation: new RegExp(req.query.place,'i'),
     })
     const packagePrice=await Packages.find({
        category:new RegExp(req.query.category,'i'),
        place:new RegExp(req.query.place,'i')
     }).select('-_id price')
   
    res.status(200).json({hotelDetails,packagePrice})

}catch(error){
    res.status(401).json({message:'In this place there is no hotel registered'})

}

}


const bookPackageAndHotel = async (req, res) => {
    try {
        console.log('this is bookPackageandhotel');
        
        const { selectedHotelId, flightDate, clients, clientPhotos, passportFrontPhotos, passportBackPhotos } = req.body;
        const bookedUserId = req.query.bookedUserId;
        const hotelw = await HotelDetails.findOne({ _id: selectedHotelId });
  
      const existingBooking = await BookedTravelers.findOne({ _id: bookedUserId });
  
      if (!existingBooking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      // Update fields outside the travelers array
      existingBooking.hotelId = selectedHotelId;
      existingBooking.flightDateAndTime = new Date(flightDate);
  
      // Initialize variables for calculations
      let totalMembers = 0;
      let totalAmountOfPackage = 0;
  
      // Wrap the forEach loop inside an async function
      const processClients = async () => {
        for (const [index, client] of clients.entries()) {
          existingBooking.travelers.push({
            travelerName: client.name,
            passportNumber: client.passportNumber,
            dob: new Date(client.clientDOB),
            phone: client.phoneNumber,
            gender: client.gender,
            photo: clientPhotos[index] ? clientPhotos[index].photo : '',
            passportFrontPhoto: passportFrontPhotos[index] ? passportFrontPhotos[index].photo : '',
            passportBackPhoto: passportBackPhotos[index] ? passportBackPhotos[index].photo : '',
          });
  
          // Update totalMembers for each client
          totalMembers++;
  
          // Find the package price based on the packageId
          const packageId = existingBooking.packageId;
          const pakge = await Packages.findOne({ _id: packageId });
          const packagePrice = pakge ? pakge.price : 0;
           existingBooking.packagePrice=packagePrice
          // Update totalAmountOfPackage for each client
          totalAmountOfPackage += packagePrice;
        }
      };
  
      // Call the async function
      await processClients();
  
      // Update totalMembers and totalAmountOfPackage in the model
      existingBooking.totalMembers = totalMembers;
      existingBooking.totalAmountOfPackage = totalAmountOfPackage;
  
      // Find hotel price based on selectedHotelId
      const hotel = await HotelDetails.findOne({ _id: selectedHotelId });
      const hotelPrice = hotel ? hotel.roomPrice : 0;
      existingBooking.hotelPrice=hotelPrice
      // Update totalAmount in the model
      existingBooking.totalAmount = totalAmountOfPackage + hotelPrice;
  
      // Save the updated document
      const updatedBooking = await existingBooking.save();
      const packageId = existingBooking.packageId;
      const pakge = await Packages.findOne({ _id: packageId }).select('-_id category place')
 
    const line_items = [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `${pakge.place} ${pakge.category} package`, // Replace with the actual name of your package
            },
            unit_amount: updatedBooking.totalAmountOfPackage * 100, // Total package amount in smallest currency unit (e.g., cents)
          },
          quantity:updatedBooking.totalMembers , // Quantity of this line item (since it's a package, quantity is 1)
        },
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Hotel Price', // Replace with the actual name of your hotel
            },
            unit_amount: updatedBooking.hotelPrice * 100, // Hotel amount in smallest currency unit (e.g., cents)
          },
          quantity: 1, // Quantity of this line item (since it's a hotel, quantity is 1)
        },
        // Add more line items as needed for additional amounts
      ];
      
      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: line_items,
        mode: 'payment',
        success_url: 'https://www.wetravels.online/success',
        cancel_url: 'https://www.wetravels.online/cancel',
      });
      
  console.log('may be res aayirikum error');
      res.status(200).json({id:session.id, message: 'Traveler details added successfully', data: updatedBooking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  const getSearchItem=async(req,res)=>{
    try{
        console.log('this is getsearchitem');
        const searchTerm = req.query.term;
        console.log('searchTerm',searchTerm);

        const regex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive
        const results = await Packages.find({ category: { $regex: regex } });
    console.log('this will be the result',results);
        res.status(200).json(results);

    }catch(error){
        console.error('Error searching for packages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  const MyBookedDetails = async (req, res) => {
    try {
      console.log('this is MyBookedDetails',req.user._id);
      const bookedTravelers = await BookedTravelers.find({userId:req.user._id})
        .populate({
          path: 'packageId',
          model: Packages,
          select: 'duration place category'
        })
        .populate({
          path: 'hotelId',
          model: HotelDetails,
          select: 'hotelName roomPrice contactNumber'
        });
  
      // Filter out documents without the hotelId field
      const filteredBookedTravelers = bookedTravelers.filter((traveler) => traveler.hotelId);
  
      const combinedData = filteredBookedTravelers.map((traveler) => ({
        packageId: {
          duration: traveler.packageId.duration,
          place: traveler.packageId.place,
          category: traveler.packageId.category,
        },
        hotelId: {
          hotelName: traveler.hotelId.hotelName,
          roomPrice: traveler.hotelId.roomPrice,
          contactNumber: traveler.hotelId.contactNumber,
        },
        address: traveler.address,
        country: traveler.country,
        email: traveler.email,
        flightDateAndTime: traveler.flightDateAndTime,
        travelers: traveler.travelers.map((individualTraveler) => ({
          travelerName: individualTraveler.travelerName,
          passportNumber: individualTraveler.passportNumber,
          dob: individualTraveler.dob,
          phone: individualTraveler.phone,
          gender: individualTraveler.gender,
        })),
        packagePrice: traveler.packagePrice,
        hotelPrice: traveler.hotelPrice,
        totalMembers: traveler.totalMembers,
        totalAmountOfPackage: traveler.totalAmountOfPackage,
        totalAmount: traveler.totalAmount,
      }));
  
      console.log('this is combined bookedTravel details', combinedData);
  
      res.status(200).json(combinedData);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };


  const googleAuth=async(req,res)=>{
    try{
        let token = req.body.credentialResponse.credential
        console.log('this is googleauth token',token);
        let decoded = jwt.decode(token)
        console.log('this is googleauth decoded',decoded);

        const { name, email, sub } = decoded
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({error:'User already exists'});
        }

        const user = await User.create({
            name,
            email,
            
        });

        if(user){
           const userToken =generateToken(res, user._id);
                res.status(201).json({
                    userToken,
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isBlocked:user.isBlocked
            });
        }


    }catch(error){

    }
  }

  const googleLogin=async(req,res)=>{
    try{
        console.log('thhis is googleLogin');
        let token = req.body.credentialResponse.credential
        console.log('this is googleLogin token',token);
        let decoded = jwt.decode(token)
        console.log('this is googleLogin decoded',decoded);
        const { email } = decoded
        const userExists = await User.findOne({ email });
  if(userExists && !userExists.isBlocked){
   const userToken= generateToken(res,userExists._id)
    res.status(201).json({
        userToken,
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        isBlocked: userExists.isBlocked,
        message:constants.LOGIN_SUCCESS
   
    })
  }else{
    res.status(400).json({error:"No User Found"})
  }
    }catch(error){


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
    loadFullDetails,
    mainUserDetails,
    fetchHotelAndPackagedDetails,
    bookPackageAndHotel,
    getSearchItem,
    MyBookedDetails,
    googleLogin,
    googleAuth,
}