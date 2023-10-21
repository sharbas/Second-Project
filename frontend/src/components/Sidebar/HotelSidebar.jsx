import React, { useState } from "react";
import "./HotelSidebar.css";
import HotelHeader from "../Header/HotelHeader.jsx";
import { FaHotel, FaPlus, FaPaperPlane, FaSignOutAlt } from "react-icons/fa";

function HotelSidebar() {
  const [isIconsOnly, setIsIconsOnly] = useState(false);

  const toggleIconsOnly = () => {
    setIsIconsOnly(!isIconsOnly);
  };

  const handleLogout = () => {
    //Add logic for logout
    console.log("logout clicked");
  };

  return (
    <>
      <HotelHeader />
      <aside className={`hotel-sidebar ${isIconsOnly ? "icons-only" : ""}`}>
        <div className="toggle-button" onClick={toggleIconsOnly}>
          {isIconsOnly ? "☰" : "✖"}
        </div>
        <ul>
          <li>
            <FaPlus className="sidebar-icon" />
            <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
              Add Hotel Details
            </span>
          </li>
          <li>
            <FaHotel
              className={`sidebar-icon ${isIconsOnly ? "hidden" : ""}`}
            />
            <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
              My Hotel
            </span>
          </li>
          <li>
            <FaPaperPlane
              className={`sidebar-icon ${isIconsOnly ? "hidden" : ""}`}
            />
            <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
              Message
            </span>
          </li>

          <li className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt
              className={`sidebar-icon ${isIconsOnly ? "hidden" : ""}`}
            />
            <span className={`menu-text ${isIconsOnly ? "hidden" : ""}`}>
              Logout
            </span>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default HotelSidebar;
