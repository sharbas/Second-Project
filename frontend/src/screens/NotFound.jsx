import React from 'react';
import '../App.css'


const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-500 text-white">
      <div className="text-center">
        <img
          src="/notfoundicon3.jpg" // Replace with the path to your danger logo image
          alt="Danger Logo"
          className="w-24 h-24 mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold mb-2">404 - Not Found</h1>
        <p className="text-lg">The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
