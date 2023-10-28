import React from "react";

const AdminHome = () => {
  
  const homeStyles = {
    backgroundColor: "rgb(11 142 140)",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const homeScreenStyles = {
  
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "50vh",
    textAlign: "center",
  };

  const titleStyles = {
    color: "white",
    fontFamily: "inherit",
    fontSize: "5rem",
    marginBottom: "20px",
  };

  const subtitleStyles = {
    fontFamily: "inherit",
    fontSize: "1.5rem",
    color:"white"
  };
  return (
    <div style={homeStyles}>
    <div style={homeScreenStyles}>
      <h1 style={titleStyles}>EXPLORE</h1>
      <h5 style={subtitleStyles}>The World With<br /> We Travel</h5>
      <h6>This Is Admin Home Page</h6>
    </div>
  </div>
  );
};

export default AdminHome;
