
import React from 'react';

function UserFooter() {
    return (
      <footer style={footerStyle}>
        <div style={containerStyle}>
          <div style={logoStyle} >
            <img src="/footeruserlogo.png" alt="Website Logo" style={{ height: '100px' ,marginRight:'10rem'}} />
          </div>
          <div style={linksStyle}>
            <ul>
              <li><a href="/" style={linkStyle}>Home</a></li>
              <li><a href="/destinations" style={linkStyle}>Destinations</a></li>
              <li><a href="/about" style={linkStyle}>About Us</a></li>
              <li><a href="/contact" style={linkStyle}>Contact</a></li>
            </ul>
          </div>
          <div style={advertisingStyle}>
          <h2 style={{fontSize:"1rem"}}> With 'We Travel,' every journey becomes an adventure.</h2>
            <div style={adImagesStyle}>
              <img src="/userhomescreen.png.jpg" alt="Advertisement 1" style={{ height: '100px', borderRadius: '10px', marginLeft: '30px' }} />
              <img src="/ad2.jpg" alt="Advertisement 2" style={{ height: '100px', borderRadius: '10px', marginLeft: '30px' }} />
              <img src="/ad5.jpg" alt="Advertisement 2" style={{ height: '100px', borderRadius: '10px', marginLeft: '30px' }} />
              <img src="/ad4.jpg" alt="Advertisement 2" style={{ height: '100px', borderRadius: '10px', marginLeft: '30px' }} />
            </div>
          </div>
          <div style={socialStyle}>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </footer>
    );
  }
  




const footerStyle = {
  background: 'black',
  color: 'white',
  padding: '20px 0',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1000px',
  margin: '0 auto',
  height: '150px',
};

const logoStyle = {
  display: 'flex',
  marginRight:'10rem',
  alignItems: 'center',
  height: '50px',
};

const linksStyle = {
  ul: {
    listStyle: 'none',
    padding: 0,
  },
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  transition: 'color 0.3s',
};

linkStyle.hover = {
  color: 'darkgray',
};

const advertisingStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const adImagesStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
};

const socialStyle = {
    a: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '1.5rem',
      margin: '0 10px',
      i: {
        transition: 'color 0.3s',
        hover: {
          color: 'darkgray',
        },
      },
    },
  };

export default UserFooter;






