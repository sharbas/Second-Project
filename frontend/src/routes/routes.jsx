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

//admin import
import AdminLogin from "../screens/Admin/AdminLogin.jsx";
import AdminHome from "../screens/Admin/AdminHome.jsx";
import PackageAddForm from "../screens/Admin/PackageAddForm.jsx"

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
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/forgotPassword" element={<ForgotPassword/>} />
      <Route path="/verifyOtp" element={<VerifyOtp/>} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path='/otpLoginEmail' element={<OtpLoginEmail/>}/>
         <Route path='/otpLogin' element={<OtpLogin/>}/>
      <Route path="" element={<PrivateRoute />}>
      <Route path="/packages&destination" element={<PackagesAndDestination/>} />
      <Route path="/places" element={<Places/>} />

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
      <Route path="/hotel" element={<HotelPrivateRoute/>}>
        <Route path="home" element={<HotelHome/>} />
        <Route path="myHotel" element={<HotelProfile/>} />
        <Route path="AddHotelDetails" element={<AddHotelDetails/>}/>
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path='/admin/otpLoginEmail' element={<OtpLoginEmail/>}/>
         <Route path='/admin/otpLogin' element={<OtpLogin/>}/>
         <Route path='/new' element={<NewPage/>}/>


      <Route path="/admin" element={<AdminPrivateRoute/>}>
        <Route path="home" element={<AdminHome />} />
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
