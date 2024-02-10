import React, { useEffect, useState } from "react";
import hotelAxiosInstance from "../../utils/hotelAxiosInstance";
import { toast } from "react-toastify";
const HotelProfile = () => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    hotelName: "",
    roomType: "",
    roomPrice: "",
    packageLocation: "",
    address: "",
    contactNumber: "",
    speciality: "",
    services: "",
  });
  const [hotelDetails, setHotelDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await hotelAxiosInstance.get("/loadHotel");
        setHotelDetails(res.data.hotel);
        setUserDetails(res.data.hotelUser);
      } catch (error) {
      }
    };
    fetchData();
  }, [edited]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedDetails({ ...hotelDetails[0] }); // Load existing data into the edit form
  };

  const handleUpdateClick = async () => {
    try {
      const updatedData = {
        ...editedDetails,
        // Add more fields as needed
      };
      const res = await hotelAxiosInstance.put("/updateDetails", updatedData);
      setEdited(!edited);
      toast.success(res.data.message || res.message);
    } catch (error) {
      console.error("Error updating data: ", error);
    }
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  const ffff = () => {};

  return (
    <div className="hotel-form bg-sky-900 flex justify-center">
      <div className="container mx-24 py-5 flex justify-center">
        <div style={{width:'100%'}} className="flex justify-center ml-24">
          <div className="flex-col  w-4/5">
          {hotelDetails &&
            hotelDetails.map((hotel, index) => (
              <div
                className="w-full md:w-3/4 lg:w-2/3  my-12 ml-24"
                key={index}
              >
                <div>
                  <div className="bg-white shadow-lg p-4 rounded-lg">
                    <div className="rounded-t bg-sky-100 text-white text-center py-8">
                      <div className="mb-4">
                        <img
                          src={`https://travelwithwetravel.website/images/${hotel.images[0]}`}
                          alt={`Profile Image ${index}`}
                          className="w-32 h-32 object-cover mx-auto rounded-full"
                        />
                      </div>
                      <button
                        onClick={handleEditClick}
                        className="btn btn-outline mt-2 font-bold"
                      >
                        Edit my home
                      </button>

                      {isEditing ? (
                        <div className="p-4 text-black ">
                          {/* Edit form fields for each hotel */}
                          <div className="mb-4">
                            <input
                              type="text"
                              name="hotelName"
                              value={editedDetails.hotelName}
                              onChange={handleChange}
                              className="block w-full px-4 py-2 bg-gray-100 border rounded mb-2"
                              placeholder="Hotel Name"
                            />

                            <input
                              type="text"
                              name="roomType"
                              value={editedDetails.roomType}
                              onChange={handleChange}
                              className="block w-full px-4 py-2 bg-gray-100 border rounded mb-2"
                              placeholder="Room Type"
                            />
                            <input
                              type="text"
                              name="roomPrice"
                              value={editedDetails.roomPrice}
                              onChange={handleChange}
                              className="block w-full px-4 py-2 bg-gray-100 border rounded mb-2"
                              placeholder="Room Price"
                            />
                            <input
                              type="text"
                              name="packageLocation"
                              value={editedDetails.packageLocation}
                              onChange={handleChange}
                              className="block w-full px-4 py-2 bg-gray-100 border rounded mb-2"
                              placeholder="Package Location"
                            />
                            <input
                              type="text"
                              name="address"
                              value={editedDetails.address}
                              onChange={handleChange}
                              className="block w-full px-4 py-2 bg-gray-100 border rounded mb-2"
                              placeholder="Address"
                            />
                            <input
                              type="text"
                              name="contactNumber"
                              value={editedDetails.contactNumber}
                              onChange={handleChange}
                              className="block w-full px-4 py-2 bg-gray-100 border rounded mb-2"
                              placeholder="Contact Number"
                            />
                            <input
                              type="text"
                              name="speciality"
                              value={editedDetails.speciality}
                              onChange={handleChange}
                              className="block w-full px-4 py-2 bg-gray-100 border rounded mb-2"
                              placeholder="Speciality"
                            />
                            <input
                              type="text"
                              name="services"
                              value={editedDetails.services}
                              onChange={handleChange}
                              className="block w-full px-4 py-2 bg-gray-100 border rounded mb-2"
                              placeholder="Services"
                            />

                            {/* Add more input fields for other hotel details */}
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 text-black">
                          <div className="flex justify-between items-center mb-4">
                            <p className="text-normal mb-0">About</p>
                          </div>
                          <div className="">
                            <div className="flex flex-wrap justify-start  w-full">
                              <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 bg-gray-800 rounded-lg m-1">
                                <p className="font-normal text-white text-black">
                                  {hotel.hotelName}
                                </p>
                              </div>
                              <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 bg-gray-800 rounded-lg pl-4 m-1">
                                <p className="font-normal text-white">
                                  {hotel.roomType}
                                </p>
                              </div>
                              <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 bg-gray-800 rounded-lg m-1">
                                <p className="font-normal text-white">
                                  {hotel.roomPrice}
                                </p>
                              </div>
                              <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 bg-gray-800 rounded-lg m-1">
                                <p className="font-normal text-white">
                                  {hotel.packageLocation}
                                </p>
                              </div>
                              <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 bg-gray-800 rounded-lg m-1 px-2">
                                <p className="font-normal text-white ">
                                  {hotel.address}
                                </p>
                              </div>
                              <div className="w-full md:w-1/2 lg-w-1/3 xl:w-1/4 p-4 bg-gray-800 rounded-lg m-1 px-2">
                                <p className="font-normal text-white text-white">
                                  {hotel.contactNumber}
                                </p>
                              </div>
                              <div className="w-full md-w-1/2 lg:w-1/3 xl:w-1/4 p-4 bg-gray-800 rounded-lg m-1">
                                <p className="font-normal text-white ">
                                  {hotel.speciality}
                                </p>
                              </div>
                              <div className="w-sm md-w-1/2 lg:w-1/3 xl:w-1/4 p-4 bg-gray-800 rounded-lg m-1">
                                <p className="font-normal text-white">
                                  {hotel.services}
                                </p>
                              </div>
                              {/* Add more fields for displaying hotel details */}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between items-center mb-4">
                        {isEditing ? null : (
                          <a
                            href="#!"
                            className="text-muted hover:text-white"
                            onClick={() => setShowAllImages(true)}
                          >
                            Show all photos
                          </a>
                        )}
                      </div>

                      {showAllImages ? (
                        <div className="flex flex-wrap justify-start">
                          {hotel.images.map((image, imgIndex) => (
                            <div className="w-1/3 p-2" key={imgIndex}>
                              <img
                                src={`https://travelwithwetravel.website/images/${image}`}
                                alt={`Hotel Image ${imgIndex}`}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      ) : null}

                      {isEditing ? (
                        <div className="p-4">
                          <button
                            onClick={handleUpdateClick}
                            className="btn btn-primary"
                          >
                            Update
                          </button>
                          <button
                            onClick={handleCancelClick}
                            className="btn btn-secondary"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}</div>
          {/* Left side div for user info */}
          {/* <div className="w-1/5 mr-4 mt-4">
            <div className="bg-white shadow-lg p-4 rounded-lg">
              <div className="text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                  alt="User Profile"
                  className="w-20 h-20 object-cover mx-auto rounded-full"
                />
                <button onClick={ffff} className="btn btn-outline mt-2">
                  Change Photo
                </button>
              </div>
              {isEditing ? (
                <div className="p-4">
                  <input
                    type="text"
                    name="name"
                    value={editedDetails.name}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 bg-gray-100 border rounded mb-2"
                    placeholder="User Name"
                  />
                  <input
                    type="text"
                    name="email"
                    value={editedDetails.email}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 bg-gray-100 border rounded mb-2"
                    placeholder="User Email"
                  />
                </div>
              ) : (
                <div className="p-4">
                  <p className="font-semibold mb-2">
                    {userDetails && userDetails[0] ? userDetails[0].name : ""}
                  </p>
                  <p className="text-sm text-gray-500">
                    {userDetails && userDetails[0] ? userDetails[0].email : ""}
                  </p>
                </div>
              )}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HotelProfile;
