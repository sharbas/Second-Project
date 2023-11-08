import React, { useEffect, useState } from 'react';
import adminAxiosInstance from '../../utils/adminAxiosInstance.js';
import axios from 'axios';

const PackageDetails = () => {
  const [packages, setPackages] = useState([]);
  const [isPackages, setIsPackages] = useState(false);
  const [combinedModalIsOpen, setCombinedModalIsOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({});
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editedPackage, setEditedPackage] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await adminAxiosInstance.get('/adminLoadPackages');
        const packages = res.data;
        setPackages(packages);
        setIsPackages(true);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, [editedPackage]);

  
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name === "categoryImages") {
      console.log('hai evidae ndd categoryImages');
      const selectedImages = Array.from(e.target.files);
      setEditedPackage({ ...editedPackage, [name]: selectedImages });
    } else if (name === "images") {
      console.log('ahi this is image else if');
      const selectedImages = Array.from(e.target.files);
      setEditedPackage({ ...editedPackage, [name]: selectedImages });
    } else {
      setEditedPackage({ ...editedPackage, [name]: value });
    }
  };


  useEffect(()=>{
  const updateData=async()=>{
    const formDataToSend = new FormData();
    for (const key in editedPackage) {
      if (key === 'categoryImages') {
        formDataToSend.append(key, editedPackage[key][0]);
      } else if (key === 'images') {
        for (const image of editedPackage[key]) {
          formDataToSend.append(key, image);
        }
      } else {
        formDataToSend.append(key, editedPackage[key]);
      }
    }
    
//     console.log("FormData contents:");
// for (const pair of formDataToSend.entries()) {
//   console.log(pair[0] + ": " + pair[1]);
// }
console.log(formDataToSend,'thisi is formdatatosend');
    try{
      const res=await axios.put('http://localhost:5000/api/admin/updatePackage',formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      


    }catch(error){

    }

  }
  updateData()
  },[editedPackage])

  const openCombinedModal = (packg) => {
    setSelectedPackage(packg);
    setSelectedImages(packg.images);
    setCombinedModalIsOpen(true);
  };

  const closeCombinedModal = () => {
    setSelectedImages([]);
    setCombinedModalIsOpen(false);
  };


  const handleEdit = (packageIndex) => {
    setEditedPackage(packages[packageIndex]);
    setEditModalIsOpen(true);
  };

  const closeModal = () => {
    setEditModalIsOpen(false);
  };

  const saveEdits = async() => {    
    setEditModalIsOpen(false);
    // const res=await adminAxiosInstance.put('/updatePackage',editedPackage)
  };

  return (
    <div className="p-35">
      <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">Travel Packages</h2>
      <div className="overflow-x-auto p-20">
        <table className="min-w-full bg-white shadow rounded-lg ">
          <thead>
            <tr>
              <th className="px-4 py-2">S:No</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Place</th>
              <th className="px-4 py-2">More Details</th>
              <th className="px-4 py-2">Duration(in days)</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Edit</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{index+1}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.place}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-blue-500 hover:text-blue-700 font-semibold py-1 px-2 rounded-lg border border-blue-500"
                    onClick={() => openCombinedModal(item)}
                  >
                    View More Details
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
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
    <div className="bg-white p-4 rounded-lg shadow-lg w-3/5 max-h-screen overflow-y-auto">
    <div className="h-full flex flex-col justify-between">
      <h2 className="text-2xl font-semibold mb-2">More Details</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Attribute</th>
            <th className="border border-gray-300 px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">
              Category Image:
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <div className='w-25 h-25'>
              <img src=  {`http://localhost:5000/images/${selectedPackage.categoryImages}`} alt="" />
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">
              Short Description:
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {selectedPackage.shortDescription}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">
              Detailed Description:
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {selectedPackage.detailedDescription}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">
              Images:
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <div className="grid grid-cols-2 gap-2">
                {selectedImages.map((image, index) => (
                  <div key={index} className="w-32 h-32 relative">
                    <img
                      src={`http://localhost:5000/images/${image}`}
                      alt={`Image ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded-full"
        onClick={closeCombinedModal}
      >
        Close
      </button>
    </div>
  </div>
)}




         {editModalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 max-h-full overflow-y-scroll pt-10">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Edit Package</h2>
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700">
                Category
              </label>
              <input
  type="text"
  className="form-input border border-black p-2 rounded  focus:outline-none focus:ring focus:ring-blue-400 hover:border-blue-400 pl-10 transition"// Add the Tailwind CSS classes
  style={{ width: "82ch" , height:'2rem' }}
  id="category"
  pattern="[A-Z][a-zA-Z]*"
  name="category"
  defaultValue={editedPackage.category}
  onChange={handleChange }
/>

               <label htmlFor="categoryImages" className="block text-gray-700">
                Category image
              </label>
              <input
                type="file"
                className="form-input"
                id="categoryImages"
                name="categoryImages"
                // defaultValue={editedPackage.categoryImage}
                onChange={handleChange }
              />
                          <label htmlFor="place" className="block text-gray-700">
                place
              </label>
              <input
  type="text"
  className="form-input border border-black p-2 rounded  focus:outline-none focus:ring focus:ring-blue-400 hover:border-blue-400 pl-10 transition"// Add the Tailwind CSS classes
  style={{ width: "82ch" , height:'2rem' }}
  id="place"
  pattern="[A-Z][a-zA-Z]*"
  name="place"
  defaultValue={editedPackage.place}
  onChange={handleChange}
/>

<label htmlFor="shortDescription" className="block text-gray-700">
                shortDescription
              </label>
             <textarea
  type="text"
  className="form-input border border-black p-2 rounded  focus:outline-none focus:ring focus:ring-blue-400 hover:border-blue-400 pl-10 transition"// Add the Tailwind CSS classes
  id="shortDescription"
  pattern="[A-Z][a-zA-Z]*"
  name="shortDescription"
  defaultValue={editedPackage.shortDescription}
  onChange={handleChange}
  rows={5}
  cols={80}
/>

<label htmlFor="detailedDescription" className="block text-gray-700">
  detailedDescription
</label>
<textarea
  className="form-input border border-black p-2 rounded  focus:outline-none focus:ring focus:ring-blue-400 hover:border-blue-400 pl-10 transition"// Add the Tailwind CSS classes
  id="detailedDescription"
  pattern="[A-Z][a-zA-Z]*"
  name="detailedDescription"
  defaultValue={editedPackage.detailedDescription}
  onChange={handleChange}
  rows={5} // You can adjust the number of rows as needed
  cols={80} // You can adjust the number of columns as needed
></textarea>


<label htmlFor="images" className="block text-gray-700">
                images
              </label>
              <input
  type="file"
  className="form-input" // Add the Tailwind CSS classes
  id="images"
  name="images"
  accept="image/*"
  // value={editedPackage.images}
  onChange={handleChange}
  multiple
/>

<label htmlFor="duration" className="block text-gray-700">
                duration
              </label>
              <input
  type="number"
  className="form-input border border-black p-2 rounded  focus:outline-none focus:ring focus:ring-blue-400 hover:border-blue-400 pl-10 transition"// Add the Tailwind CSS classes
  style={{ width: "82ch" , height:'2rem' }}
  id="duration"
  name="duration"
  min={0}
  defaultValue={editedPackage.duration}
  onChange={handleChange}
/>

<label htmlFor="price" className="block text-gray-700">
                price
              </label>
              <input
  type="number"
  className="form-input border border-black p-2 rounded  focus:outline-none focus:ring focus:ring-blue-400 hover:border-blue-400 pl-10 transition"// Add the Tailwind CSS classes
  style={{ width: "82ch" , height:'2rem' }}
  id="price"
  name="price"
  min={0}
  defaultValue={editedPackage.price}
  onChange={handleChange}
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
