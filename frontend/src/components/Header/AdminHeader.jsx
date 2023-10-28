import React from "react";
import {toast} from 'react-toastify'
import { useDispatch,useSelector } from "react-redux";
import './AdminHeader.css'
import { FaSearch } from "react-icons/fa";
import adminAxiosInstance from "../../utils/adminAxiosInstance";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/AdminSlices/adminAuthSlice.js";

function AdminHeader() {
 const { adminInfo } = useSelector((state) => state.adminauth);
 const dispatch = useDispatch();
const navigate=useNavigate()
 const handleLogout =async () => {
  try{

    const res=await adminAxiosInstance.post('/logout')
      dispatch(logout());
      navigate('/admin/login')
  }catch(error){
    toast.error(error?.data?.message || error.error);
  }
 }

 return (
   <header className="admin-header">
     <div className="logo">
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
     <div className="search-bar">
       <input type="text" placeholder="Search..." />
       <button type="button">
         <FaSearch size={20} />
       </button>
     </div>
     <div className="profile-container">
       {/* <div
         className="profile-image"
         style={{
           backgroundImage:
             "url('https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg')",
         }}
       ></div> */}
       {adminInfo && (
         <button onClick={handleLogout}  className="logout-button">Logout</button>
       )}
     </div>
   </header>
 );
}
export default AdminHeader;
