import React from "react";
import { Routes, Route } from "react-router-dom";


//user  import
import HomeScreen from "../screens/Users/HomeScreen.jsx";
import LoginScreen from "../screens/Users/LoginScreen.jsx";
import RegisterScreen from "../screens/Users/RegisterScreen.jsx";
import ProfileScreen from "../screens/Users/ProfileScreen.jsx";
import ForgotPassword from "../screens/Users/ForgotPassword.jsx";
import VerifyOtp from "../screens/Users/VerifyOtp.jsx";
import ResetPassword from "../screens/Users/ResetPassword.jsx";
import PackageDetails from "../screens/Admin/PackageDetails.jsx";
import PackagesAndDestination from "../screens/Users/PackagesAndDestination.jsx";
import PackageDetailsUser from '../screens/Users/PackageDetails.jsx';
import Places from "../screens/Users/Places.jsx";
import Wishlist from "../screens/Users/Wishlist.jsx"
import PaymentAndDetails from "../screens/Users/PaymentAndDetails.jsx"
import CartDetails from "../components/cardDetails.jsx";
import Cancel from "../components/Cancel.jsx";
import Success from "../components/Success.jsx";
import UserChat from "../screens/Users/UserChat.jsx";
import Contact from "../screens/Users/Contact.jsx";
import MyBookedDetails from "../screens/Users/MyBookedDetails.jsx";




//hotel import
import HotelLogin from "../screens/Hotel/HotelLogin.jsx";
import HotelHome from "../screens/Hotel/HotelHome.jsx";
import HotelSignUp from "../screens/Hotel/HotelSignup.jsx";
import HotelForgotPassword from "../screens/Hotel/HotelForgotPassword.jsx";
import HotelVerifyOtp from "../screens/Hotel/HotelVerifyOtp.jsx";
import HotelResetPassword from "../screens/Hotel/HotelResetPassword.jsx";
// import HotelUserProfile from "../screens/Hotel/HotelUserProfile.jsx"
import AddHotelDetails from "../screens/Hotel/AddHotelDetails.jsx";
import HotelProfile from "../screens/Hotel/HotelProfile.jsx"
import HotelChat from "../screens/Hotel/HotelChat.jsx";


//admin import
import AdminLogin from "../screens/Admin/AdminLogin.jsx";
import PackageAddForm from "../screens/Admin/PackageAddForm.jsx"
import BookedTravelers from "../screens/Admin/BookedTravelers.jsx";
import AdminDashboard from "../screens/Admin/AdminDashboard.jsx";


//all private import
import PrivateRoute from "../components/privateRoute.jsx";
import AdminPrivateRoute from "../components/AdminPrivateRoute.jsx";
import HotelPrivateRoute from "../components/HotelPrivate.jsx";
import HotelManagement from "../screens/Admin/HotelManagement.jsx";
import UserManagement from "../screens/Admin/UserManagement.jsx"
import OtpLogin from "../screens/otp/OtpLogin.jsx";
import OtpLoginEmail from "../screens/otp/OtpLoginEmail.jsx";
import NotFound from "../screens/NotFound.jsx";
import NewPage from "../screens/Admin/newpage.jsx";





const Routers = () => {
  return (
    <Routes>
      <Route index={true} path="/" element={<HomeScreen />}/>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />}/>
      <Route path="/forgotPassword" element={<ForgotPassword/>}/>
      <Route path="/verifyOtp" element={<VerifyOtp/>} />
      <Route path="/resetPassword" element={<ResetPassword />}/>
      <Route path='/otpLoginEmail' element={<OtpLoginEmail/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path='/paymentAndDetails/:category/:place/:bookedUserId' element={<PaymentAndDetails/>}/>
      <Route path='/cartDetails' element={< CartDetails/>}/>
      <Route path='/success' element={< Success/>}/>
      <Route path='/cancel' element={<Cancel/>}/>
      <Route path='/chats/:chatid' element={<UserChat/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/myBookedDetails' element={<MyBookedDetails/>}/>

      
         <Route path='/otpLogin' element={<OtpLogin/>}/>
      <Route path="" element={<PrivateRoute />}>
      <Route path="/packages&destination" element={<PackagesAndDestination/>} />
      <Route path="/places" element={<Places/>}/>
      <Route path="/PackageDetails" element={<PackageDetailsUser/>} />
      
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      <Route path="/hotel/login" element={<HotelLogin />} />
      <Route path="/hotel/register" element={<HotelSignUp />} />
      <Route path='/hotel/forgotPassword' element={<HotelForgotPassword/>}/>
      <Route path='/hotel/verifyOtp' element={<HotelVerifyOtp/>}/>
      <Route path='/hotel/resetPassword' element={<HotelResetPassword/>}/>

      <Route path='/hotel/otpLoginEmail' element={<OtpLoginEmail/>}/>
      <Route path='/hotel/otpLogin' element={<OtpLogin/>}/>
      <Route path='/hotel/chats' element={<HotelChat/>}/>
      
      <Route path="/hotel" element={<HotelPrivateRoute/>}>
        <Route path="home" element={<HotelHome/>} />
        <Route path="myHotel" element={<HotelProfile/>} />
        <Route path="AddHotelDetails" element={<AddHotelDetails/>}/>
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path='/admin/otpLoginEmail' element={<OtpLoginEmail/>}/>
         <Route path='/admin/otpLogin' element={<OtpLogin/>}/>
         <Route path='/new' element={<NewPage/>}/>
         <Route path='/admin/bookedTravelers' element={<BookedTravelers/>}/>
         


      <Route path="/admin" element={<AdminPrivateRoute/>}>
        <Route path="home" element={<AdminDashboard />} />
        <Route path="hotelManagement" element={<HotelManagement/>} />
        <Route path="userManagement" element={<UserManagement/>} />
         <Route path="packageAddForm" element={<PackageAddForm/>} /> 
         <Route path="PackageDetails" element={<PackageDetails/>} /> 

         
      </Route>
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
};

export default Routers;
