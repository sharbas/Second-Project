import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import adminAxiosInstance from "../../utils/adminAxiosInstance";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/AdminSlices/adminAuthSlice.js";

function AdminHeader() {
  const { adminInfo } = useSelector((state) => state.adminauth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await adminAxiosInstance.post('/logout');
      dispatch(logout());
      navigate('/admin/login');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  return (
    <header className="bg-green-300 p-2 text-white flex items-center justify-between fixed w-full z-10">
      <div className="logo flex-shrink-0">
        <div
          className="logo-image"
          style={{
            backgroundImage: `url('/We_Travel__3_-removebg-preview.png')`,
            backgroundSize: 'contain', // or 'cover' based on your preference
            backgroundRepeat: 'no-repeat',
            width: '100px',
            height: '60px',
          }}
        ></div>
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
      <div className="profile-container flex items-center cursor-pointer ml-4">
        {adminInfo && (
          <button
            onClick={handleLogout}
            className="bg-black text-white p-2 rounded-full font-bold transition duration-300 hover:bg-gray-800"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default AdminHeader;
