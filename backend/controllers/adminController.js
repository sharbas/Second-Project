import asyncHandler from "express-async-handler"
import Admin from '../models/adminModel.js'
import generateToken from "../utils/adminGenerateToken.js"
import User from "../models/userModel.js"
import Hotel from "../models/hotelModel.js"
import Packages from "../models/packageModel.js"
import BookedTravelers from '../models/bookedTravelers.js'
import HotelDetails from '../models/hotelDetailsModel.js'

const authadmin=asyncHandler(async(req,res)=>{
        const {email,password}=req.body
        const admin=await Admin.findOne({email})
        if(admin && await admin.matchPassword(password)){
        const adminToken= generateToken(res,admin._id)
    
        
        res.status(201).json({
              adminToken,
                message:'login successfull'

            })
        }else{
            res.status(400).json({ message: 'Invalid mail or password' }); // Send a JSON response with an error message
            throw new Error('Invalid mail or password admin');

        }
    })

   const logoutAdmin=asyncHandler(async(req,res)=>{
        res.cookie('admnjwt','',{
            httpOnlyP:true,
            expires:new Date(0)
        })
        res.status(200).json({message:'Logout Admin success'})
    })

const adminLoadUsers=asyncHandler(async(req,res)=>{
    const users=await User.find({},'name email _id isBlocked')
    
    if(users.length>0){
 

        res.status(201).json({users})
    }else{
        res.status(404).json('Not found');
    }
})

const adminLoadHotelUsers=asyncHandler(async(req,res)=>{
 
    const hotelUsers=await Hotel.find({},'name email _id isBlocked')

    if(hotelUsers.length>0){
    
res.status(201).json({hotelUsers})
    }else{
        res.status(404).json('Not found')
    }
})

const blockUnblockHotelUser=asyncHandler(async(req,res)=>{
    const {userId,isBlocked}=req.body
    const hotelUser=await User.UpdateOne({_id:userId},{$set:{isBlocked:isBlocked}})
    res.status(200)
})

const blockUnblockUser=asyncHandler(async(req,res)=>{
   const {userId,isBlocked}=req.body
   const user=await User.updateOne({_id:userId},{$set:{isBlocked:isBlocked}})

})


const adminLoadPackages=async(req,res)=>{
    try{
      const  packages=await Packages.find({})
        res.status(200).json(packages)

    }catch(error){
        res.status(500).json({ error: 'An error occurred while processing your request.' });

    }
}


const adminLoadBookedTravelers = async (req, res) => {
  try {
    console.log('this is adminadminLoadBookedTravelers');
    const bookedTravelers = await BookedTravelers.find({})
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

  
const dashboardData = async (req, res) => {
  try {
    const pieChartData = await BookedTravelers.aggregate([
      {
        $match: {
          totalAmount: { $exists: true, $ne: null },
          "travelers.gender": { $in: ["male", "female", "other"] },
        },
      },
      {
        $unwind: "$travelers",
      },
      {
        $group: {
          _id: "$travelers.gender",
          count: { $sum: 1 },
        },
      },
    ]);
    
    // The result will be an array with three elements: one for each gender
    console.log(pieChartData,'pieChartDataaaaaaaaa')
    

  // Aggregate pipeline for bar graph data (e.g., total number of travelers for each country)
const barGraphData = await BookedTravelers.aggregate([
  {
    $match: {
      totalAmount: { $exists: true, $ne: null },
    },
  },
  {
    $group: {
      _id: "$country",
      totalTravelers: { $sum: { $size: "$travelers" } }, // Calculate total number of travelers
    },
  },
]);


    // Aggregate pipeline for statistics div data
    const statisticsData = await BookedTravelers.aggregate([
      {
        $match: {
          totalAmount: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" },
          averagePackagePrice: { $avg: "$totalAmountOfPackage" },
          totalMembers: { $sum: "$totalMembers" },
        },
      },
    ]);

    // Assuming you have a response structure you want to send
    const responseData = {
      pieChart: pieChartData,
      barGraph: barGraphData,
      statistics: statisticsData[0], // Use [0] because it's a single group result
    };
    res.status(200).json({ success: true, data: responseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};



export {authadmin,
  logoutAdmin,adminLoadUsers,
  adminLoadHotelUsers,blockUnblockUser,
  blockUnblockHotelUser,adminLoadPackages,
  adminLoadBookedTravelers,dashboardData}
