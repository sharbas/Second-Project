import React from "react";
import './AdminHeader.css'
import { FaSearch } from "react-icons/fa";

function AdminHeader() {
  return (
    <header className="admin-header">
      <div className="logo">
  <div
    className="logo-image"
    style={{
      backgroundImage: `url('/public/logo2.png')`,
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
export default AdminHeader;
