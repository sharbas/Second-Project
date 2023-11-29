import React, { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import hotelAxiosInstance from '../../utils/hotelAxiosInstance';

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

  const [location,setLocation]=useState([])

  useEffect(()=>{
  const  fetchLocation=async()=>{
      const locationRes=await hotelAxiosInstance.get('/fetchLocation')
      
      setLocation( locationRes.data.location)

    }
fetchLocation()
  },[])

useEffect(()=>{
  console.log(location,'this is useffect location')
},[location])

  const hotelUserID = useSelector((state) => state.hotelauth._id);

  const handleChange = (e) => {
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

    formDataToSend.append('hotelName', formData.hotelName);
    formDataToSend.append('roomType', formData.roomType);
    formDataToSend.append('roomPrice', formData.roomPrice);
    formDataToSend.append('packageLocation', formData.packageLocation);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('contactNumber', formData.contactNumber);
    formDataToSend.append('speciality', formData.speciality);
    formDataToSend.append('services', formData.services);

    for (const image of formData.images) {
      formDataToSend.append('images', image);
    }

    try {
      let hotelInfo = JSON.parse(localStorage.getItem('hotelInfo'));
      const token = hotelInfo.hotelToken;
      const res = await axios.post(
        'http://www.wetravels.online/api/hotel/addHotelDetails',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
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
<div className="container mx-auto pt-10 p-6 bg-sky-900">
  <form className="border rounded p-6 bg-white w-1/2 ml-60" onSubmit={handleSubmit}>
    <div className="relative z-0 mb-6 group">
      <input
        type="file"
        name="images"
        onChange={handleChange}
        multiple
        className="block w-full px-4 py-2 border rounded border-black"
        accept="image/*"
      />
      <label htmlFor="images" className="block text-gray-600">
        Images of Room
      </label>
    </div>
    <div className="relative z-0 mb-6 group">
      <input
        type="text"
        name="hotelName"
        value={formData.hotelName}
        onChange={handleChange}
        className="block w-full px-4 py-2 border rounded border-black"
      />
      <label htmlFor="hotelName" className="block text-gray-600">
        Hotel Name
      </label>
    </div>
    <div className="relative z-0 mb-6 group">
      <select
        name="roomType"
        value={formData.roomType}
        onChange={handleChange}
        className="block w-full px-4 py-2 border rounded border-black"
      >
        <option value="1bhk">1 BHK</option>
        <option value="2bhk">2 BHK</option>
        <option value="3bhk">3 BHK</option>
        <option value="other">Other</option>
      </select>
      <label htmlFor="roomType" className="block text-gray-600">
        Room Type
      </label>
    </div>
    <div className="relative z-0 mb-6 group">
      <input
        type="number"
        name="roomPrice"
        value={formData.roomPrice}
        onChange={handleChange}
        className="block w-full px-4 py-2 border rounded border-black"
      />
      <label htmlFor="roomPrice" className="block text-gray-600">
        Room Price
      </label>
    </div>
    <div className="relative z-0 mb-6 group">
  <select
    name="packageLocation"
    value={formData.packageLocation}
    onChange={handleChange}
    className="block w-full px-4 py-2 border rounded border-black"
  >
    {location.map((loc, index) => (
      <option key={index} value={loc.place}>
        {loc.place}
      </option>
    ))}
    <option value="other">Other</option>
  </select>
  <label htmlFor="packageLocation" className="block text-gray-600">
    Package Location
  </label>
</div>

    <div className="relative z-0 mb-6 group">
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="block w-full px-4 py-2 border rounded border-black"
      />
      <label htmlFor="address" className="block text-gray-600">
        Address
      </label>
    </div>
    <div className="relative z-0 mb-6 group">
      <input
        type="text"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
        className="block w-full px-4 py-2 border rounded border-black"
      />
      <label htmlFor="contactNumber" className="block text-gray-600">
        Contact Number
      </label>
    </div>
    <div className="relative z-0 mb-6 group">
      <textarea
        name="speciality"
        value={formData.speciality}
        onChange={handleChange}
        className="block w-full px-4 py-2 border rounded border-black"
      ></textarea>
      <label htmlFor="speciality" className="block text-gray-600">
        Enter speciality
      </label>
    </div>
    <div className="relative z-0 mb-6 group">
      <textarea
        name="services"
        value={formData.services}
        onChange={handleChange}
        className="block w-full px-4 py-2 border rounded border-black"
      ></textarea>
      <label htmlFor="services" className="block text-gray-600">
        Enter Services
      </label>
    </div>
    <button
      type="submit"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center shadow-md"
    >
      Add Hotel
    </button>
  </form>
</div>

  
  );
};

export default AddHotelDetails;
