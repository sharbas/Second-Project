import React from "react";
import { FaSearch } from "react-icons/fa";
import './HotelHeader.css'
function HotelHeader() {
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
            backgroundImage:
              "url('https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg')",
          }}
        ></div>
      </div>
    </header>
  );
}
export default HotelHeader;
