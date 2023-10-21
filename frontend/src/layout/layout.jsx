// import react from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import Routers from "../routes/routes.jsx";
import { useLocation } from "react-router-dom";
import AdminSidebar from "../components/Sidebar/AdminSidebar.jsx";
import HotelSidebar from "../components/Sidebar/HotelSidebar.jsx";


function Layout() {
  let location = useLocation();
  let hotelHeader = location.pathname.startsWith("/hotel");
  let adminHeader = location.pathname.startsWith("/admin");
  let userHeader = location.pathname.startsWith("/user");
  
  let isUserLogin = location.pathname === "/user/login" || location.pathname === "/user/register";
  let isHotelLogin = location.pathname === "/hotel/login" || location.pathname === "/hotel/register";
  let isAdminLogin = location.pathname === "/admin/login" || location.pathname === "/admin/register";


  return (
    <>
      {hotelHeader && !isHotelLogin ? (
        <HotelSidebar />
      ) : adminHeader && !isAdminLogin ? (
        <AdminSidebar />
      ) :userHeader && !isUserLogin? (
        <Navbar />
      ):''}
      <Routers />
    </>
  );
}

export default Layout;
