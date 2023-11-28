import React, { useEffect, useState } from 'react';
import adminAxiosInstance from '../../utils/adminAxiosInstance.js';
import axios from 'axios';

const BookedTravelers = () => {
  const [bookedTravelers, setBookedTravelers] = useState([]);

  const [combinedModalIsOpen, setCombinedModalIsOpen] = useState(false);
  const [selectedBookedTravelers, setSelectedBookedTravelers] = useState({});
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editedPackage, setEditedPackage] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await adminAxiosInstance.get('/adminLoadBookedTravelers');
        const bookedTravelers = res.data;
        setBookedTravelers(bookedTravelers);
       
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, [editedPackage]);

  
  // const handleChange = (e) => {
  //   const { name, value, type } = e.target;
  //   if (name === "categoryImages") {
  //     console.log('hai evidae ndd categoryImages');
  //     const selectedImages = Array.from(e.target.files);
  //     setEditedPackage({ ...editedPackage, [name]: selectedImages });
  //   } else if (name === "images") {
  //     console.log('ahi this is image else if');
  //     const selectedImages = Array.from(e.target.files);
  //     setEditedPackage({ ...editedPackage, [name]: selectedImages });
  //   } else {
  //     setEditedPackage({ ...editedPackage, [name]: value });
  //   }
  // };


//   useEffect(()=>{
//   const updateData=async()=>{
//     const formDataToSend = new FormData();
//     for (const key in editedPackage) {
//       if (key === 'categoryImages') {
//         formDataToSend.append(key, editedPackage[key][0]);
//       } else if (key === 'images') {
//         for (const image of editedPackage[key]) {
//           formDataToSend.append(key, image);
//         }
//       } else {
//         formDataToSend.append(key, editedPackage[key]);
//       }
//     }
    
// //     console.log("FormData contents:");
// // for (const pair of formDataToSend.entries()) {
// //   console.log(pair[0] + ": " + pair[1]);
// // }
// console.log(formDataToSend,'thisi is formdatatosend');
//     try{
//       const res=await axios.put('http://localhost:5000/api/admin/updatePackage',formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
      


//     }catch(error){

//     }

//   }
//   updateData()
//   },[editedPackage])

  const openCombinedModal = (travelers) => {
    setSelectedBookedTravelers(travelers)
    // setSelectedImages(packg.images);
    setCombinedModalIsOpen(true);
  };

  const closeCombinedModal = () => {
    setCombinedModalIsOpen(false);
  };


  // const handleEdit = (packageIndex) => {
  //   setEditedPackage(packages[packageIndex]);
  //   setEditModalIsOpen(true);
  // };

  // const closeModal = () => {
  //   setEditModalIsOpen(false);
  // };

  // const saveEdits = async() => {    
  //   setEditModalIsOpen(false);
  //   // const res=await adminAxiosInstance.put('/updatePackage',editedPackage)
  // };

  return (
    <div className="p-35 ml-40 mr-40">
      <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center pt-10">Booked Travelers</h2>
      <div className="overflow-x-auto p-20">
        <table className="min-w-full bg-white shadow rounded-lg ">
          <thead>
            <tr>
              <th className="px-4 py-2">S:No</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Place</th>
              <th className="px-4 py-2">More Details</th>
              <th className="px-4 py-2">Booked hotel Details</th>
              <th className="px-4 py-2">flight date and time</th>
              <th className="px-4 py-2">total members</th>
              <th className="px-4 py-2">address</th>
              <th className="px-4 py-2">Total package amount</th>
              <th className="px-4 py-2">Total amount</th>
              <th className="px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {bookedTravelers.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{index+1}</td>
                <td className="px-4 py-2">{item.packageId.category}</td>
                <td className="px-4 py-2">{item.packageId.place}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-blue-500 hover:text-blue-700 font-semibold py-1 px-2 rounded-lg border border-blue-500"
                    onClick={() => openCombinedModal(item)}
                  >
                    View More
                  </button>
                </td>
                <td className="px-4 py-2"><p>Name:{item.hotelId.hotelName}</p><p>Price:{item.hotelId.roomPrice}</p><p>Number:{item.hotelId.contactNumber}</p></td>
                <td className="px-4 py-2">{item.flightDateAndTime}</td>
                <td className="px-4 py-2">{item.totalMembers}</td>
                <td className="px-4 py-2">{item.address}</td>
                <td className="px-4 py-2">{item.totalAmountOfPackage}</td>
                <td className="px-4 py-2">{item.totalAmount} </td>
                <td className="px-4 py-2">{item.email}</td>
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
            {selectedBookedTravelers.travelers.map((individualTraveler, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    Traveler Name{(index+1)}:
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {individualTraveler.travelerName}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    Passport Number:
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {individualTraveler.passportNumber}
                  </td>
                </tr>
                <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Date of Birth:
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {individualTraveler.dob}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Phone:
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {individualTraveler.phone}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Gender:
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {individualTraveler.gender}
                </td>
              </tr>
               {/* Add a separation row */}
               <tr>
                  <td className="border border-gray-300 px-4 py-2" colSpan="2">
                    <hr className="my-2" />
                  </td>
                </tr>
              </React.Fragment>
            ))}
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





    </div>
  );
};

export default BookedTravelers;
