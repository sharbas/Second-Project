import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./PackageAddForm.css";
import { useNavigate } from "react-router-dom";

const PackageAddForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    categoryImages: [],
    place: "",
    shortDescription: "",
    detailedDescription: "",
    images: [],
    duration: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name === "categoryImages") {
      const selectedImages = Array.from(e.target.files);
      setFormData({ ...formData, [name]: selectedImages });
    } else if (name === "images") {
      const selectedImages = Array.from(e.target.files);
      setFormData({ ...formData, [name]: selectedImages });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "categoryImages" || key === "images") {
        for (const image of formData[key]) {
          formDataToSend.append(key, image);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const res = await axios.post(
        "https://www.wetravels.online/api/admin/addPackageDetails",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    
      navigate("/admin/PackageDetails");
      toast.success(res.data.message);
      setFormData({
        category: "",
        place: "",
        shortDescription: "",
        detailedDescription: "",
        images: [],
        duration: "",
        price: "",
        categoryImages: [],
      });
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-1/2 mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Add Travel Package</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative z-0 group">
          <input
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-black appearance-none focus:outline-none focus:border-blue-600"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="category"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer"
          >
            Category
          </label>
        </div>
        <div className="relative z-0 group">
          <input
            type="file"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-black appearance-none focus:outline-none focus:border-blue-600"
            id="categoryImages"
            name="categoryImages"
            accept="image/*"
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="categoryImages"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer"
          >
            Category Images
          </label>
        </div>
        <div className="relative z-0 group">
          <input
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-black appearance-none focus:outline-none focus:border-blue-600"
            id="place"
            name="place"
            value={formData.place}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="place"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer"
          >
            Place
          </label>
        </div>
        <div className="relative z-0 group">
          <textarea
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-black appearance-none focus:outline-none focus:border-blue-600"
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="shortDescription"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer"
          >
            Short Description
          </label>
        </div>
        <div className="relative z-0 group">
          <textarea
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-black appearance-none focus:outline-none focus:border-blue-600"
            id="detailedDescription"
            name="detailedDescription"
            value={formData.detailedDescription}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="detailedDescription"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer"
          >
            Detailed Description
          </label>
        </div>
        <div className="relative z-0 group">
          <input
            type="file"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-black appearance-none focus:outline-none focus:border-blue-600"
            id="images"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="images"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer"
          >
            Images
          </label>
        </div>
        <div className="relative z-0 group">
          <input
            type="number"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-black appearance-none focus:outline-none focus:border-blue-600"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min={1}
            placeholder=" "
            required
          />
          <label
            htmlFor="duration"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer"
          >
            Duration (in days)
          </label>
        </div>
        <div className="relative z-0 group">
          <input
            type="number"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-black appearance-none focus:outline-none focus:border-blue-600"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min={0}
            placeholder=" "
            required
          />
          <label
            htmlFor="price"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer"
          >
            Price
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          Add Package
        </button>
      </form>
    </div>
  );
};

export default PackageAddForm;
