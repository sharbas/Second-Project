import React, { useState } from 'react';
import {toast} from 'react-toastify'
import './PackageAddForm.css'
import axios from 'axios';
const PackageAddForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    place: '',
    shortDescription: '',
    detailedDescription: '',
    images: [],
    duration: '',
    price: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
  console.log('this is formdata',formData);
    // Append text data to the formData
    formDataToSend.append('category', formData.category);
    formDataToSend.append('place', formData.place);
    formDataToSend.append('shortDescription', formData.shortDescription);
    formDataToSend.append('detailedDescription', formData.detailedDescription);
    formDataToSend.append('duration', formData.duration);
    formDataToSend.append('price', formData.price);
  
    // Append image files
    for (const image of formData.images) {
      formDataToSend.append('images', image);
    }
  
    try {
      console.log(' this is  try',formDataToSend);
      const res = await axios.post('http://localhost:5000/api/admin/addPackageDetails', formDataToSend,{
        headers: {
          'Content-Type': 'multipart/form-data', 
        },});
      toast.success(res.data.message);
      // Clear the form after a successful submission
      setFormData({
        category: '',
        place: '',
        shortDescription: '',
        detailedDescription: '',
        images: [],
        duration: '',
        price: '',
      });
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };
  

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md  flex items-center flex-col">
      <h2 className="text-3xl font-semibold mb-4">Add Travel Package</h2>
      <form onSubmit={handleSubmit} className='w-3/5 '>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">Category</label>
          <input
            type="text"
            className="form-input"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="place" className="block text-gray-700">Place</label>
          <input
            type="text"
            className="form-input"
            id="place"
            name="place"
            value={formData.place}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="shortDescription" className="block text-gray-700">Short Description</label>
          <textarea
            className="form-textarea"
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="detailedDescription" className="block text-gray-700">Detailed Description</label>
          <textarea
            className="form-textarea"
            id="detailedDescription"
            name="detailedDescription"
            value={formData.detailedDescription}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="images" className="block text-gray-700">Images</label>
          <input
            type="file"
            className="form-input"
            id="images"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="duration" className="block text-gray-700">Duration (in days)</label>
          <input
            type="number"
            className="form-input"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min={1}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">Price</label>
          <input
            type="number"
            className="form-input"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min={0}
          />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          Add Package
        </button>
      </form>
    </div>
  );
};

export default PackageAddForm;
