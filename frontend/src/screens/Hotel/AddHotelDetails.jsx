// HotelDetails.js
import React, { useState } from 'react';
import './AddHotelDetails.css';

const AddHotelDetails = () => {
  const [formData, setFormData] = useState({
    images: [],
    hotelName: '',
    roomType: '',
    roomPrice: '',
    packageLocation: '',
    address: '',
    contactNumber: '',
    specialty: '',
    services: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const selectedImages = Array.from(e.target.files);
      setFormData({ ...formData, images: selectedImages });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send the data to a server or store in state
    console.log(formData);
  };

  return (
    <div className="hotel-form" style={{width:'70rem' }}>
      <h2>Add Hotel Details</h2>
      <form onSubmit={handleSubmit} className="form-grid">
       
        <div className="right-panel">
          <div className="row">
            <div className="column" style={{  width: '30rem' , borderRight: '1px solid #ccc', padding: '0 10px' }}>
              <label htmlFor="hotelName">Hotel Name</label>
              <input type="text" name="hotelName" value={formData.hotelName} onChange={handleChange} />
            </div>
            <div className="column" style={{  width: '30rem'}}>
              <label htmlFor="roomType">Room Type</label>
              <select name="roomType" value={formData.roomType} onChange={handleChange}>
                <option value="1bhk">1 BHK</option>
                <option value="2bhk">2 BHK</option>
                <option value="3bhk">3 BHK</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="column" style={{  width: '30rem' , borderRight: '1px solid #ccc', padding: '0 10px' }}>
              <label htmlFor="roomPrice">Room Price</label>
              <input type="number" name="roomPrice" value={formData.roomPrice} onChange={handleChange} />
            </div>
            <div className="column" style={{  width: '30rem'}}>
              <label htmlFor="packageLocation">Package Location</label>
              <select name="packageLocation" value={formData.packageLocation} onChange={handleChange}>
                <option value="location1">Location 1</option>
                <option value="location2">Location 2</option>
                <option value="location3">Location 3</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="row">
  <div className="column" style={{ width: '30rem', borderRight: '1px solid #ccc', padding: '0 10px' }}>
    <label htmlFor="address">Address</label>
    <input type="text" name="address" value={formData.address} onChange={handleChange} />
  </div>
  <div className="column" style={{ width: '30rem', padding: '0 10px' }}>
    <label htmlFor="contactNumber">Contact Number</label>
    <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
  </div>
</div>

          <div className="row" >
            <div className="column" style={{  width: '30rem', borderRight: '1px solid #ccc' ,padding: '0 10px'}}>
              <label htmlFor="specialty">Enter Specialty</label>
              <textarea name="specialty" value={formData.specialty} onChange={handleChange} />
            </div>
            <div className="column" style={{  width: '30rem',padding: '0 10px'}}>
              <label htmlFor="services" >Enter Services</label>
              <textarea name="services" value={formData.services} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="left-panel" style={{paddingLeft:'20rem'}}>
          <label htmlFor="images">Images of Room</label>
          <br />
          <input type="file" name="images" onChange={handleChange} multiple style={{  width: '10rem'}} />
         <div>
          <button type="submit" className="btn btn-primary">
            Add Hotel
          </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddHotelDetails;
