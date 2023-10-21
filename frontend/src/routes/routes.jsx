import React from "react";
import { Routes, Route } from "react-router-dom";

//user  import
import HomeScreen from "../screens/Users/HomeScreen.jsx";
import LoginScreen from "../screens/Users/LoginScreen.jsx";
import RegisterScreen from "../screens/Users/RegisterScreen.jsx";
import ProfileScreen from "../screens/Users/ProfileScreen.jsx";

//hotel import
import HotelLogin from "../screens/Hotel/HotelLogin.jsx";
import HotelHome from "../screens/Hotel/HotelHome.jsx";
import HotelSignUp from "../screens/Hotel/HotelSignup.jsx";

//admin import
import AdminLogin from "../screens/Admin/AdminLogin.jsx";
import AdminHome from "../screens/Admin/AdminHome.jsx";


//all private import
import PrivateRoute from "../components/privateRoute.jsx";
import AdminPrivateRoute from "../components/AdminPrivateRoute.jsx";
import HotelManagement from "../screens/Admin/hotelManagement.jsx";
import UserManagement from "../screens/Admin/userManagement.jsx";

const Routers = () => {
  return (
    <Routes>
      <Route index={true} path="/user/home" element={<HomeScreen />} />
      <Route path="/user/login" element={<LoginScreen />} />
      <Route path="/user/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/user/profile" element={<ProfileScreen />} />
      </Route>

      <Route path="/hotel/login" element={<HotelLogin />} />
      <Route path="/hotel/register" element={<HotelSignUp />} />
      <Route path="" element={<hotelPrivateRoute/>}>
        <Route path="/hotel/home" element={<HotelHome />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />


      <Route path="/admin" element={<AdminPrivateRoute/>}>
        <Route path="home" element={<AdminHome />} />
        <Route path="hotelManagement" element={<HotelManagement />} />
        <Route path="userManagement" element={<UserManagement />} />
      </Route>
    </Routes>
  );
};

export default Routers;
