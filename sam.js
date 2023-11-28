import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import HomeScreen from "./screens/Users/HomeScreen.jsx";
import LoginScreen from "./screens/Users/LoginScreen.jsx";
import RegisterScreen from "./screens/Users/RegisterScreen.jsx";
import ProfileScreen from "./screens/Users/ProfileScreen.jsx";
import PrivateRoute from "./components/privateRoute.jsx";
import HotelLogin from "./screens/Hotel/HotelLogin.jsx";
import HotelHome from "./screens/Hotel/HotelHome.jsx";
import HotelSignUp from "./screens/Hotel/HotelSignup.jsx";
import AdminLogin from "./screens/Admin/AdminLogin.jsx";
import AdminHome from "./screens/Admin/AdminHome.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      <Route path="/hotel/login" element={<HotelLogin />} />
      <Route path="/hotel/home" element={<HotelHome />} />
      <Route path="/hotel/register" element={<HotelSignUp />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/home" element={<AdminHome />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    
  </Provider>
);





//hotel api slice
 // googleAuth: builders.mutation({
    //   query: (data) => ({
    //     url: `${HOTELS_URL}/oauth`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // googleLogin: builders.mutation({
    //   query: (data) => ({
    //     url: `${HOTELS_URL}/g-login`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),




    //userapislice
    // googleAuth: builders.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/oauth`,
    //     method: `POST`,
    //     body: data,
    //   }),
    // }),
    // googleLogin: builders.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/g-Login`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),




    import React, { useEffect, useState } from 'react';
import adminAxionsInstance from '../../utils/adminAxiosInstance.js';

const PackageDetails = () => {
  const [packages, setPackages] = useState([]);
  const [isPackages, setIsPackages] = useState(false);
  const [combinedModalIsOpen, setCombinedModalIsOpen] = useState(false); // Combine short desc, detailed desc, and images modal

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({});
  const [editedPackage, setEditedPackage] = useState(packages);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(()=>{
    console.log(editedPackage,'this is edited packages');
  },[editedPackage])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await adminAxionsInstance.get('/adminLoadPackages');
        const packages = res.data;
        setPackages(packages);
        setIsPackages(true);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);
  
  const openCombinedModal = (packg) => {
    setSelectedPackage(packg);
    setSelectedImages(packg.images);
    setCombinedModalIsOpen(true);
  };

  const closeModal = () => {
    setCombinedModalIsOpen(false);
  };



  const handleEdit = (packageIndex) => {
    setSelectedPackage(packages[packageIndex]);
    setEditModalIsOpen(true);
  };

 

  const saveEdits = () => {
    setPackages((prevPackages) => {
      const updatedPackages = [...prevPackages];
      const index = updatedPackages.findIndex((pkg) => pkg.id === selectedPackage.id);
      updatedPackages[index] = editedPackage;
      return updatedPackages;
    });
    setEditModalIsOpen(false);
  };

  return (
    <div className="p-30">
      <h2 className="text-2xl font-semibold mb-4">Travel Packages</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Category Image</th>
              <th className="px-4 py-2">Place</th>
              <th className="px-4 py-2">Short Desc, Detailed Desc, and Images</th>
              <th className="px-4 py-2">Duration (in days)</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Edit</th>
            </tr>
          </thead>
        <tbody>
  {packages.map((item, index) => (
    <tr key={item.id}>
      <td className="px-4 py-2">{item.id}</td>
      <td className="px-4 py-2">{item.category}</td>
      <td className="px-4 py-2">{item.categoryImage}</td>
      <td className="px-4 py-2">{item.place}</td>
      <td className="px-4 py-2">
      <button
                    className="text-blue-500 hover:underline hover:text-blue-700 font-semibold py-1 px-2 rounded-lg border border-blue-500"
                    onClick={() => openCombinedModal(item)}
                  >
                    View Details
                  </button>
                </td>
     
      <td className="px-4 py-2">{item.duration}</td>
      <td className="px-4 py-2">{item.price}</td>
      <td className="px-4 py-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded"
          onClick={() => handleEdit(index)}
        >
          Edit
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      {combinedModalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Package Details</h2>
            <h3 className="text-xl font-semibold mb-2">{selectedPackage.category}</h3>
            <img src={selectedPackage.categoryImage} alt="Category" className="w-full mb-2" />
            <p><strong>Place:</strong> {selectedPackage.place}</p>
            <p><strong>Duration (in days):</strong> {selectedPackage.duration}</p>
            <p><strong>Price:</strong> {selectedPackage.price}</p>
            <p><strong>Short Description:</strong> {selectedPackage.shortDescription}</p>
            <p><strong>Detailed Description:</strong> {selectedPackage.detailedDescription}</p>
            <p><strong>Images:</strong></p>
            <ul>
              {selectedImages.map((image, index) => (
                <li key={index}>
                  <img src={image} alt={`Image ${index}`} className="w-32 h-32 mr-2 mb-2" />
                </li>
              ))}
            </ul>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded mt-4"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {editModalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Edit Package</h2>
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700">
                Category
              </label>
              <input
  type="text"
  className="form-input border border-black" // Add the Tailwind CSS classes
  id="category"
  name="category"
  value={editedPackage.category}
  onChange={(e) => setEditedPackage({ ...editedPackage, category: e.target.value })}
/>

               <label htmlFor="categoryImage" className="block text-gray-700">
                Category image
              </label>
              <input
                type="file"
                className="form-input"
                id="categoryImage"
                name="categoryImage"
                value={editedPackage.categoryImage}
                onChange={(e) =>
                  setEditedPackage({ ...editedPackage, categoryImage: e.target.value })
                }
              />
                          <label htmlFor="place" className="block text-gray-700">
                place
              </label>
              <input
  type="text"
  className="form-input border border-black" // Add the Tailwind CSS classes
  id="place"
  name="place"
  value={editedPackage.place}
  onChange={(e) => setEditedPackage({ ...editedPackage, place: e.target.value })}
/>

<label htmlFor="shortDescription" className="block text-gray-700">
                shortDescription
              </label>
              <input
  type="text"
  className="form-input border border-black" // Add the Tailwind CSS classes
  id="shortDescription"
  name="shortDescription"
  value={editedPackage.shortDescription}
  onChange={(e) => setEditedPackage({ ...editedPackage, shortDescription: e.target.value })}
/>

<label htmlFor="detailedDescription" className="block text-gray-700">
                detailedDescription
              </label>
              <input
  type="text"
  className="form-input border border-black" // Add the Tailwind CSS classes
  id="detailedDescription"
  name="detailedDescription"
  value={editedPackage.detailedDescription}
  onChange={(e) => setEditedPackage({ ...editedPackage, detailedDescription: e.target.value })}
/>

<label htmlFor="images" className="block text-gray-700">
                images
              </label>
              <input
  type="file"
  className="form-input" // Add the Tailwind CSS classes
  id="images"
  name="images"
  value={editedPackage.images}
  onChange={(e) => setEditedPackage({ ...editedPackage, images: e.target.value })}
/>

<label htmlFor="duration" className="block text-gray-700">
                duration
              </label>
              <input
  type="text"
  className="form-input border border-black" // Add the Tailwind CSS classes
  id="duration"
  name="duration"
  value={editedPackage.duration}
  onChange={(e) => setEditedPackage({ ...editedPackage, duration: e.target.value })}
/>

<label htmlFor="price" className="block text-gray-700">
                price
              </label>
              <input
  type="text"
  className="form-input border border-black" // Add the Tailwind CSS classes
  id="price"
  name="price"
  value={editedPackage.price}
  onChange={(e) => setEditedPackage({ ...editedPackage, price: e.target.value })}
/>
              
            </div>
            {/* Add more fields for editing package details here */}
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded-full mr-4"
                onClick={saveEdits}
              >
                Save Edits
              </button>
              <button
                className="bg-gray-400 hover-bg-gray-600 text-white font-semibold py-1 px-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default PackageDetails;









///////////////////////////////////////////////////