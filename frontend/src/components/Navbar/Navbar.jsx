import React, { useState,useEffect } from "react";
import {useSelector,useDispatch} from 'react-redux'
import {Link, Navigate,useNavigate} from 'react-router-dom'
import {logout} from "../../slices/authSlice.js"
import "./Navbar.css";
// import { useLogoutMutation } from "../../slices/usersApiSlice.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt,faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import userAxiosInstance from "../../utils/userAxiosInstance.js";


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentActive, setCurrentActive] = useState(null);
  const userInfo=useSelector((state)=>state.auth.userInfo)


const dispatch=useDispatch()
// const Logout=useLogoutMutation()
const navigate=useNavigate()

  const isHomeRoute = location.pathname === '/'
  const navLinks = [
    { id: 1, text: 'Home', path: '/' },
    { id: 2, text: 'Packages & Destination', path: '/packages&destination' },
    { id: 3, text: 'Contact', path: '/contact' },
    { id: 4, text: 'Chats', path: '/chats/allchats' },
    

  ];

  const handleMobileMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleClick = (index) => {
    setCurrentActive(index);
    if (window.innerWidth <= 999) {
      handleMobileMenuClick();
    }
  };

  const handleLogout=async()=>{
    try{
console.log('hai logout');
   const res=await userAxiosInstance.post('/logout')
console.log('hai logout2');

          dispatch(logout())
          navigate('/login')
    }catch(error){
toast.error(error?.error)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999) {
        // Close the mobile menu when the screen size is larger
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  return (
    <>
    <nav className={`navbar${isHomeRoute ? '-home' : ''}`}>
      <div className="logo">
      <a href="#">
      <img
  id="logo"
  src='/LOGO-user.png'
  alt="Logo"
  style={{ width: '100px', height: '100px' }} // Use an object, not a string
/>
      </a>
      </div>
      <div>
        <ul id="navbar" className={mobileMenuOpen ? 'active' : ''}>
          {navLinks.map((link, index) => (
            <li key={link.id}>
              <Link
                to={link.path}
                className={index === currentActive ? 'active-link' : ''}
              >
                {link.text}
              </Link>
            </li>
          ))}
          {userInfo ? (
            <>


<li>
<button onClick={handleLogout} className="logout-button">
<FontAwesomeIcon icon={faSignOutAlt} />
</button>
</li>
              <li>
<Link to="/profile" className="profile-icon">
  <img
    src="/profilelogo.png"
    alt="User Profile"
    style={{
      width: '30px', // Adjust the width as needed
      height: '30px', // Adjust the height as needed
      borderRadius: '50%', // Makes it rounded
    }}
  />
</Link>
</li>
            </>
          ) : (
            <>
            <li>
              <Link to="/login"> <FontAwesomeIcon icon={faSignInAlt} /></Link>
            </li>
            {/* <li>
<Link to="/login" className="profile-icon">
  <span role="img" aria-label="user">👤</span>
</Link>
</li> */}
            </>
          )}
        </ul>
        {/* Toggle button for small screens */}
        <div id="toggle-button" onClick={handleMobileMenuClick}>
          <i
            id="bar"
            className={mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}
          >{'☰'}</i>
        </div>
      </div>
    </nav>
  </>

  );
};
export default Navbar;
