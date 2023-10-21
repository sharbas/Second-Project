import React, { useState } from "react";
import "./AdminSidebar.css";
import { useDispatch } from "react-redux";
import AdminHeader from "../Header/AdminHeader.jsx";
import { Link,useNavigate } from "react-router-dom"; // Import the Link component
import { axiosInstance } from "../../utils/adminAxiosInst";
import {
  FaHome,
  FaUser,
  FaHotel,
  FaSuitcase,
  FaPlus,
  FaEdit,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";
import { logout } from "../../slices/AdminSlices/adminAuthSlice";

function AdminSidebar() {
  const [isIconsOnly, setIsIconsOnly] = useState(false);

  const toggleIconsOnly = () => {
    setIsIconsOnly(!isIconsOnly);
  };

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleLogout =async () => {
    try{
      const res=await axiosInstance.post('/logout')
       dispatch(logout())
       navigate('/admin/login')
       
     

    }catch(error){
      toast.error(error?.error)
    }
  };

  return (
    <>
      <AdminHeader />
      <aside className={` admin-sidebar ${isIconsOnly ? "icons-only" : ""}`}>
  
        <div className="toggle-button" onClick={toggleIconsOnly}>
          {isIconsOnly ? "☰" : "✖"}
        </div>
        
        <ul>
          <li>
            <Link to="/admin/home"> {/* Add Link to Dashboard */}
            <div className="d-flex" >
              <FaHome className="sidebar-icon" />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                Dashboard
              </span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/admin/userManagement"> {/* Add Link to User Management */}
            <div className="d-flex" >
              <FaUser className={`sidebar-icon ${isIconsOnly ? "hidden" : ""}`} />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                User Management
              </span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/admin/hotelManagement"> {/* Add Link to Hotel Management */}
            <div className="d-flex" >
              <FaHotel
                className={`sidebar-icon ${isIconsOnly ? "hidden" : ""}`}
              />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                Hotel Management
              </span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/admin/packageBooked"> {/* Add Link to Package Booked */}
            <div className="d-flex" >
              <FaSuitcase
                className={`sidebar-icon ${isIconsOnly ? "hidden" : ""}`}
              />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                Package Booked
              </span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/admin/addPackage"> {/* Add Link to Add Package */}
            <div className="d-flex" >
              <FaPlus
                className={`sidebar-icon ${isIconsOnly ? "hidden" : ""}`}
              />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                Add Package
              </span>
            </div>
            </Link>
          </li>
          <li>
            <Link to="/admin/editPackage"> {/* Add Link to Edit Package */}
            <div className="d-flex" >
              <FaEdit
                className={`sidebar-icon ${isIconsOnly ? "hidden" : ""}`}
              />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                Edit Package
              </span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/admin/salesReport"> {/* Add Link to Sales Report */}
            <div className="d-flex" >
              <FaChartBar
                className={`sidebar-icon ${isIconsOnly ? "hidden" : ""}`}
              />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                Sales Report
              </span>
              </div>
            </Link>
          </li>
          <li className="logout-button" onClick={handleLogout}>
            <Link to=""> {/* Add Link to Logout */}
            <div className="d-flex" >
              <FaSignOutAlt
                className={`sidebar-icon ${isIconsOnly ? "hidden" : ""}`}
              />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                Logout
              </span>
              </div>
            </Link>
          </li>
        </ul>
       
      </aside>
    </>
  );
}

export default AdminSidebar;
