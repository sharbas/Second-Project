import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import HomeScreen from "./screens/Users/HomeScreen.jsx";
import LoginScreen from "./screens/Users/LoginScreen.jsx";
import RegisterScreen from "./screens/Users/RegisterScreen.jsx";
import ProfileScreen from "./screens/Users/ProfileScreen.jsx";
import PrivateRoute from "./components/privateRoute.jsx";
import HotelLogin from "./screens/Hotel/HotelLogin.jsx";
import HotelHome from "./screens/Hotel/HotelHome.jsx";
import HotelSignUp from "./screens/Hotel/HotelSignup.jsx";
import AdminLogin from "./screens/Admin/AdminLogin.jsx";
import AdminHome from "./screens/Admin/AdminHome.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      <Route path="/hotel/login" element={<HotelLogin />} />
      <Route path="/hotel/home" element={<HotelHome />} />
      <Route path="/hotel/register" element={<HotelSignUp />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/home" element={<AdminHome />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    
  </Provider>
);





//hotel api slice
 // googleAuth: builders.mutation({
    //   query: (data) => ({
    //     url: `${HOTELS_URL}/oauth`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // googleLogin: builders.mutation({
    //   query: (data) => ({
    //     url: `${HOTELS_URL}/g-login`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),




    //userapislice
    // googleAuth: builders.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/oauth`,
    //     method: `POST`,
    //     body: data,
    //   }),
    // }),
    // googleLogin: builders.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/g-Login`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),