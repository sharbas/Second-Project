import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';


const AddHotelDetails = () => {
  const [formData, setFormData] = useState({
    hotelName: '',
    roomType: '',
    roomPrice: '',
    packageLocation: '',
    address: '',
    contactNumber: '',
    speciality: '',
    services: '',
    images: [],
  });

  const hotelUserID=useSelector(state=>(state.hotelauth._id))

  const handleChange = (e) => {
    console.log(hotelUserID,'this is hotelUserId');
    const { name, value, type } = e.target;
    if (type === 'file') {
      const selectedImages = Array.from(e.target.files);
      setFormData({ ...formData, images: selectedImages });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    console.log(formData,'this is formdata');

    formDataToSend.append('hotelName', formData.hotelName);
    formDataToSend.append('roomType', formData.roomType);
    formDataToSend.append('roomPrice', formData.roomPrice);
    formDataToSend.append('packageLocation', formData.packageLocation);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('contactNumber', formData.contactNumber);
    formDataToSend.append('speciality', formData.speciality);
    formDataToSend.append('services', formData.services);
    // formDataToSend.append('packageLocation', formData.packageLocation)
    for (const image of formData.images) {
      formDataToSend.append('images', image);
    }

    try {
      console.log('this is try  and fordatatosend',formDataToSend);
      let hotelInfo =JSON.parse(localStorage.getItem('hotelInfo')) ;
      console.log(hotelInfo,'thwis is hotelInfo');
      const token=hotelInfo.hotelToken
      console.log('this is token',token);
      const res = await axios.post('http://localhost:5000/api/hotel/addHotelDetails', formDataToSend, {
        headers: {
          'Authorization' : `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(res.data.message);
      setFormData({
        images: [],
        hotelName: '',
        roomType: '',
        roomPrice: '',
        packageLocation: '',
        address: '',
        contactNumber: '',
        speciality: '',
        services: '',
      });
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6">
      <h2 className="text-2xl font-semibold">Add Hotel Details</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <label htmlFor="images" className="block text-gray-600">Images of Room</label>
          <input
            type="file"
            name="images"
            onChange={handleChange}
            multiple
            className="block w-full px-4 py-2 bg-gray-100 border rounded"
            accept="image/*"
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="hotelName" className="block text-gray-600">Hotel Name</label>
          <input
            type="text"
            name="hotelName"
            value={formData.hotelName}
            onChange={handleChange}
            className="block w-full px-4 py-2 bg-gray-100 border rounded"
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="roomType" className="block text-gray-600">Room Type</label>
          <select name="roomType" value={formData.roomType} onChange={handleChange} className="block w-full px-4 py-2 bg-gray-100 border rounded">
            <option value="1bhk">1 BHK</option>
            <option value="2bhk">2 BHK</option>
            <option value="3bhk">3 BHK</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="col-span-1">
          <label htmlFor="roomPrice" className="block text-gray-600">Room Price</label>
          <input
            type="number"
            name="roomPrice"
            value={formData.roomPrice}
            onChange={handleChange}
            className="block w-full px-4 py-2 bg-gray-100 border rounded"
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="packageLocation" className="block text-gray-600">Package Location</label>
          <select name="packageLocation" value={formData.packageLocation} onChange={handleChange} className="block w-full px-4 py-2 bg-gray-100 border rounded">
            <option value="location1">Location 1</option>
            <option value="location2">Location 2</option>
            <option value="location3">Location 3</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="col-span-1">
          <label htmlFor="address" className="block text-gray-600">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="block w-full px-4 py-2 bg-gray-100 border rounded"
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="contactNumber" className="block text-gray-600">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="block w-full px-4 py-2 bg-gray-100 border rounded"
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="speciality" className="block text-gray-600">Enter speciality</label>
          <textarea
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
            className="block w-full px-4 py-2 bg-gray-100 border rounded"
          ></textarea>
        </div>

        <div className="col-span-2">
          <label htmlFor="services" className="block text-gray-600">Enter Services</label>
          <textarea
            name="services"
            value={formData.services}
            onChange={handleChange}
            className="block w-full px-4 py-2 bg-gray-100 border rounded"
          ></textarea>
        </div>

        <div className="col-span-2">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Add Hotel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHotelDetails;
