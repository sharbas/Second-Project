import React, { useEffect, useState } from "react";
import "./AdminSidebar.css";
import { useDispatch,useSelector } from "react-redux";
import AdminHeader from "../Header/AdminHeader.jsx";
import {NavLink,useNavigate } from "react-router-dom"; // Import the Link component
import  adminAxiosInstance  from "../../utils/adminAxiosInstance";
import { logout } from "../../slices/AdminSlices/adminAuthSlice";
import {
  FaHome,
  FaUser,
  FaHotel,
  FaSuitcase,
  FaList,
  FaPlus,
  FaEdit,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminSidebar({toggleSidebar}) {
  const [isIconsOnly, setIsIconsOnly] = useState(false);

  const toggleIconsOnly = () => {
    setIsIconsOnly(!isIconsOnly);
    toggleSidebar('admin')
  };
  const adminInfo=useSelector((state)=>state.adminauth)

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleLogout =async () => {
    try{
      const res=await adminAxiosInstance.post('/logout')
       dispatch(logout())
       navigate('/admin/login')
       
     

    }catch(error){
      toast.error(error?.error)
    }
  };

  return (
    <>
      <AdminHeader />
    { adminInfo &&  <aside className={` admin-sidebar ${isIconsOnly ? "icons-only" : ""}`}>
  
        <div className="toggle-button" onClick={toggleIconsOnly}>
          {isIconsOnly ? "☰"  : "✖"}

        </div>
        
        <ul>
          <li>
          <NavLink to='/admin/home' className="active-link" style={{ textDecoration: 'none', color: 'white' }}> 
            <div className="d-flex border-white" >
              <FaHome className="sidebar-icon" />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                Dashboard
              </span>
              </div>
              </NavLink> 
          </li>
          <li >
          <NavLink to='/admin/userManagement' className="active-link" style={{ textDecoration: 'none', color: 'black' }}> {/* Add NavLink to User Management */}
            <div className="d-flex" >
              <FaUser className={`sidebar-icon ${isIconsOnly ? "hidden" : ""}`} />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                User Management
              </span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/hotelManagement" className="active-link" style={{ textDecoration: 'none', color: 'black' }}> {/* Add NavLink to Hotel Management */}
            <div className="d-flex" >
              <FaHotel
                className={`sidebar-icon ${isIconsOnly ? "hidden" : ""}`}
              />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
               
                Hotel Management
              </span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/bookedTravelers" className="active-link" style={{ textDecoration: 'none', color: 'black' }}> {/* Add NavLink to Package Booked */}
            <div className="d-flex" >
              <FaSuitcase
                className={`sidebar-icon ${isIconsOnly ? "hidden" : ""}`}
              />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                Package Booked
              </span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/packageAddForm" className="active-link" style={{ textDecoration: 'none', color: 'black' }}> {/* Add NavLink to Add Package */}
            <div className="d-flex" >
              <FaPlus
                className={`sidebar-icon ${isIconsOnly ? "hidden" : ""}`}
              />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                Add Package
              </span>
            </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/PackageDetails" className="active-link" style={{ textDecoration: 'none', color: 'black' }}> {/* Add NavLink to Edit Package */}
            <div className="d-flex" >
            <FaList
                 className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`}
                  />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                 Package details
              </span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/salesReport" className="active-link" style={{ textDecoration: 'none', color: 'black' }}> {/* Add NavLink to Sales Report */}
            <div className="d-flex" >
              <FaChartBar
                className={`sidebar-icon ${isIconsOnly ? "hidden" : ""}`}
              />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                Sales Report
              </span>
              </div>
            </NavLink>
          </li>
          <li className="logout-button" onClick={handleLogout}>
            <NavLink to="" className="active-link" style={{ textDecoration: 'none', color: 'black' }}> {/* Add NavLink to Logout */}
            <div className="d-flex" >
              <FaSignOutAlt
                className={`sidebar-icon ${isIconsOnly ? "hidden" : ""}`}
              />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                Logout
              </span>
              </div>
            </NavLink>
          </li>
        </ul>
       
      </aside>}
    </>
  );
}

export default AdminSidebar;
