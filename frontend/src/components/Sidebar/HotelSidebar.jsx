import React, { useState } from "react";
import "./HotelSidebar.css";
import HotelHeader from "../Header/HotelHeader.jsx";
import {FaHome, FaHotel, FaPlus, FaPaperPlane, FaSignOutAlt } from "react-icons/fa";
import { useDispatch,useSelector } from "react-redux";
import hotelAxiosInstance from "../../utils/hotelAxiosInstance";
import { logout } from "../../slices/HotelSlices/hotelAuthSlice";
import { Link, useNavigate } from "react-router-dom";
function HotelSidebar({toggleSidebar}) {
  const [isIconsOnly, setIsIconsOnly] = useState(false);

  const toggleIconsOnly = () => {
    setIsIconsOnly(!isIconsOnly);
    toggleSidebar('hotel')
  };
  const hotelInfo=useSelector((state)=>state.hotelauth)
  console.log(hotelInfo,'hotelinfoffffff');

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleLogout = () => {
  try{
const res=hotelAxiosInstance.post('/logout')
dispatch(logout())
navigate('/hotel/login')
  }catch(error){
    toast.error(error?.error)
  }
  };

  return (
    <>
      <HotelHeader />
    { hotelInfo && <aside className={`hotel-sidebar ${isIconsOnly ? "icons-only" : ""}`}>
        <div className="toggle-button" onClick={toggleIconsOnly}>
          {isIconsOnly ? "☰" : "✖"}
        </div>
        <ul>
        <li>
  <Link to="/hotel/home"> {/* Replace with the correct path */}
    <div className="d-flex">
      <FaHome className="sidebar-icon" /> {/* Replace with the correct icon */}
      <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
        Home
      </span>
    </div>
  </Link>
</li>

          <li>
            <Link to='/hotel/AddHotelDetails'>
            <div className="d-flex" >
            <FaPlus className="sidebar-icon" />
            <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
              Add Hotel Details
            </span>
            </div>
            </Link>
          </li>
          <li>
            <Link to='/hotel/myHotel'>
          <div className="d-flex" >
            <FaHotel
              className={`sidebar-icon ${isIconsOnly ? "hidden" : ""}`}
            />
            <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
              My Hotel
            </span>
            </div>
            </Link>
          </li>
          <li>
          <div className="d-flex" >
            <FaPaperPlane
              className={`sidebar-icon ${isIconsOnly ? "hidden" : ""}`}
            />
            <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
              Message
            </span>
            </div>
          </li>

          <li className="logout-button" onClick={handleLogout}>
          <div className="d-flex" >
            <FaSignOutAlt
              className={`sidebar-icon ${isIconsOnly ? "hidden" : ""}`}
            />
            <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
              Logout
            </span>
            </div>
          </li>
        </ul>
      </aside>}
    </>
  );
}

export default HotelSidebar;
