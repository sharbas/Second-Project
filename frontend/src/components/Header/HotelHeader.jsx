import React from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/HotelSlices/hotelAuthSlice.js";
import { useNavigate } from "react-router-dom";
import hotelAxiosInstance from "../../utils/hotelAxiosInstance";
import './HotelHeader.css'
import {toast} from "react-toastify";

function HotelHeader() {
  const dispatch = useDispatch();
  const { hotelInfo } = useSelector((state) => state.hotelauth); // Replace with your actual auth slice state
  const navigate=useNavigate()
  const handleLogout =async () => {
    try{
      
      const res=await hotelAxiosInstance.post('/logout')
      dispatch(logout());
      console.log('hai this hotellogout');
        navigate('/hotel/login')
    }catch(error){
      toast.error(error?.data?.message || error.error);
    }
    }

  return (
    <header className="hotel-header">
      <div className="logo">
        <img src="" alt="" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button type="button">
          <FaSearch size={20} />
        </button>
      </div>
      <div className="profile-container">
          <div
            className="profile-image"
            style={{
              backgroundImage: "url('https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg')",
            }}
          ></div>
     
        {hotelInfo && (
          <button onClick={handleLogout}  className="logout-button" >Logout</button>
        )}
      </div>
    </header>
  );
}

export default HotelHeader;
