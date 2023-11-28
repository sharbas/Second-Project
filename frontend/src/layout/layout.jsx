// import react from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import Routers from "../routes/routes.jsx";
import { useLocation } from "react-router-dom";
import AdminSidebar from "../components/Sidebar/AdminSidebar.jsx";
import HotelSidebar from "../components/Sidebar/HotelSidebar.jsx";
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux"
import UserFooter from "../components/footer/UserFooter.jsx";
import "./layout.css"


function Layout() {
  let location = useLocation();
  let hotel = location.pathname.startsWith("/hotel");
  let admin = location.pathname.startsWith("/admin");
   const [isSidebarOpen,setIsSidebarOpen]=useState(true)
   const adminInfo=useSelector((state)=>state.adminauth)
   const hotelInfo=useSelector((state)=>state.hotelauth)




   const toggleSidebar=(sidebarType)=>{
    setIsSidebarOpen((prevIsSidebarOpen)=>{
      if(sidebarType==='admin' && admin){
        return !prevIsSidebarOpen
      }else if(sidebarType==='hotel'&& hotel){
        return !prevIsSidebarOpen
      }
      return prevIsSidebarOpen
    })
   }
    //  let isUserLogin = location.pathname === "/login" || location.pathname === "/register"||location.pathname === "/forgotPassword"|| location.pathname === "/verifyOtp"|| 
    //  location.pathname === "/resetPassword"|| location.pathname === "/otpLoginEmail"|| location.pathname === "/otpLogin";
    //  let isHotelLogin = location.pathname === "/hotel/login" || location.pathname === "/hotel/register"||location.pathname === "/hotel/forgotPassword"|| location.pathname === "/hotel/verifyOtp"|| 
    //  location.pathname === "/hotel/resetPassword"|| location.pathname === "/hotel/otpLoginEmail"|| location.pathname === "/hotel/otpLogin";;
    //  let isAdminLogin = location.pathname === "/admin/login" || location.pathname === "/admin/register";

if(admin){

  return(
    <>
    <AdminSidebar toggleSidebar={toggleSidebar}/>
    <div id="admin" className={adminInfo?`content-container ${isSidebarOpen ? '' :'no-left-padding'}`:''} style={{paddingTop:'5rem',width:'100%'}} >
       <Routers/>
    </div>
    </>
  )
}else if(hotel){
  useEffect(()=>{
    console.log('this si hotel useeffect');
  
  })
  return(
    <>
    <HotelSidebar toggleSidebar={toggleSidebar}/>

    <div className={hotelInfo?`content-container ${isSidebarOpen?'':'no-left-padding'}`:''} style={{paddingTop:'5rem',width:'100%'}}>
<Routers/>
    </div>
    </>
  )
}else{
  return(
  <>
  {<Navbar/>}
  <Routers/>
  {<UserFooter/>}
  </>)
}
  



  // return (
  //   <>
  //     {hotelHeader && !isHotelLogin ? (
  //       <HotelSidebar />
  //     ) : adminHeader && !isAdminLogin ? (
  //       <AdminSidebar />
  //     ) :userHeader && !isUserLogin? (
  //       <Navbar />
  //     ):''}
  //     <Routers />
  //   </>
  // );
}

export default Layout
