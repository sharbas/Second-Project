import React from 'react';

function UserFooter() {
  return (
    <footer className="bg-black text-white py-10">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-4">
      <img src="/footeruserlogo.png" alt="Your Image Alt Text" style={{ height: '70px', width: '70px',marginRight:'24rem' }} />
      </div>
      <div className="lg:ml-80">
        <ul>
          <li><a href="/" className="hover:text-gray-400">Home</a></li>
          <li><a href="/destinations" className="hover:text-gray-400">Destinations</a></li>
          <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
          <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
        </ul>
      </div>
    
      <div className="space-x-4">
        <a href="#" className="text-white text-2xl"><i className="fab fa-facebook hover:text-gray-400"></i></a>
        <a href="#" className="text-white text-2xl"><i className="fab fa-twitter hover:text-gray-400"></i></a>
        <a href="#" className="text-white text-2xl"><i className="fab fa-instagram hover:text-gray-400"></i></a>
      </div>
    </div>
  </footer>
  
  );
}

export default UserFooter;
