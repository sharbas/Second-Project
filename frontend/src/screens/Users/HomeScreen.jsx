import React from "react";
import "./HomeScreen.css";
import { Link } from 'react-router-dom'

const HomeScreen = () => {
  const homeStyles = {
    position: "relative",
    backgroundImage: 'url("/userhomescreen.png.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    textAlign: "center",
  };

  const overlayStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  };

  const titleStyles = {
    color: "black",
    fontFamily: "inherit",
    fontSize: "5rem",
    marginTop: "90px",
    // Add animation class for title
    animate__animated: "animate__fadeInDown",
  };

  const subtitleStyles = {
    fontFamily: "inherit",
    fontSize: "1.5rem",
    color: "black",
    // Add animation class for subtitle
    animate__animated: "animate__fadeInUp",
  };

  return (
    <div style={homeStyles} className="relative">
      <div style={overlayStyles}></div>
      <div className="flex flex-col items-center justify-center h-full relative mt-12">
        <h1 style={titleStyles}>EXPLORE</h1>
        <h5 style={subtitleStyles}>The World With<br /> We Travel</h5>
           {/* Additional Banners, Images, and Category Sections */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-20 mb-40">
  {/* Banner 1 */}
  <Link to="https://www.wetravels.online/places?category=Solo&&packageId=6544dfbc0fe7d68bdad9edf8" style={{ textDecoration: 'none' }} className="block">
  <div className="bg-white p-4 rounded-md shadow-md overflow-hidden hover:transform hover:scale-105 transition-transform">
    {/* Add content for the first banner */}
    <img src="/solo.jpeg" alt="Banner 1" className="w-full h-40 object-cover object-center mb-4" />
    <p className="font-mono text-black">Explore solo Adventures.</p>
  </div>
</Link>

 
  {/* Banner 2 */}
   <Link to="/your-link-here" style={{ textDecoration: 'none' }} className="block">
  <div className="bg-white p-4 rounded-md shadow-md overflow-hidden hover:transform hover:scale-105 transition-transform">
    {/* Add content for the second banner */}
    <img src="/dubai.jpeg" alt="Banner 2" className="w-full h-40 object-cover mb-4" />
    <p className="font-mono text-black">Explore Dubai with family.</p>
  </div>
  </Link>
  {/* Banner 3 */}
   <Link to="https://www.wetravels.online/places?category=Honeymoon&&packageId=6544e4260fe7d68bdad9ee05" style={{ textDecoration: 'none' }} className="block">
  <div className="bg-white p-4 rounded-md shadow-md overflow-hidden hover:transform hover:scale-105 transition-transform">
    {/* Add content for the third banner */}
    <img src="/honeymoon.jpg" alt="Banner 3" className="w-full h-40 object-cover mb-4" />
    <p className="font-mono text-black">Honeymoon To France</p>
  </div>
  </Link>
</div>

      </div>
   
    </div>
  );
};

export default HomeScreen;
