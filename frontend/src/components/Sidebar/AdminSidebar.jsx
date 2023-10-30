import React, { useEffect, useState } from "react";
import {BsFillArrowRightSquareFill} from "react-icons/bs";
import "./AdminSidebar.css";
import { useDispatch,useSelector } from "react-redux";
import AdminHeader from "../Header/AdminHeader.jsx";
import { Link,useNavigate } from "react-router-dom"; // Import the Link component
import  adminAxiosInstance  from "../../utils/adminAxiosInstance";
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
import { logout } from "../../slices/AdminSlices/adminAuthSlice";

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
  
        <div className="" onClick={toggleIconsOnly}>
          {isIconsOnly ? <BsFillArrowRightSquareFill className="w-4 h-4 "/> : "✖"}

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
            <Link to="/admin/packageAddForm"> {/* Add Link to Add Package */}
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
            <Link to="/admin/PackageDetails"> {/* Add Link to Edit Package */}
            <div className="d-flex" >
            <FaList
                 className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`}
                  />
              <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
                 Package details
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
       
      </aside>}
    </>
  );
}

export default AdminSidebar;
