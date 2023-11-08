import React from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/HotelSlices/hotelAuthSlice.js";
import { useNavigate } from "react-router-dom";
import hotelAxiosInstance from "../../utils/hotelAxiosInstance";
import { toast } from "react-toastify";

function HotelHeader() {
  const dispatch = useDispatch();
  const { hotelInfo } = useSelector((state) => state.hotelauth); // Replace with your actual auth slice state
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await hotelAxiosInstance.post('/logout');
      dispatch(logout());
      navigate('/hotel/login');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  return (
<header className="bg-black p-2 text-white flex items-center justify-between fixed h-20 w-full z-10">
      <div className="logo">
        <img src="" alt="" />
      </div>
      {/* <div className="search-bar flex items-center ml-auto">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded-full border border-blue-400"
        />
        <button type="button" className="bg-white text-black p-2 rounded-full">
          <FaSearch size={20} />
        </button>
      </div> */}
      <div className="profile-container">
        <div
          className="profile-image"
          style={{
            backgroundImage: "url('https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg')",
          }}
        ></div>
        {hotelInfo && (
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white p-2 rounded-full font-bold transition duration-300 hover:bg-blue-700"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default HotelHeader;
