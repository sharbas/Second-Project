import React, { useState } from 'react';

const HotelProfile = () => {
  const dummyHotelDetails = {
    hotelName: 'Dummy Hotel',
    roomType: 'Deluxe',
    roomPrice: '$150',
    packageLocation: 'City Center',
    // Add more dummy data as needed
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState(dummyHotelDetails);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    setIsEditing(false);
    // Perform an update action here (you can simulate it)
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedDetails(dummyHotelDetails);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const selectedImages = Array.from(e.target.files);
      setEditedDetails({ ...editedDetails, images: selectedImages });
    } else {
      setEditedDetails({ ...editedDetails, [name]: value });
    }
  };

  const {
    hotelName,
    roomType,
    roomPrice,
    packageLocation,
    // Add more properties as needed
  } = editedDetails;

  return (
    <div className="hotel-form">
      <div className="container mx-auto py-5">
        <div className="flex justify-center">
          <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
            <div className="bg-white shadow-lg p-4 rounded-lg">
              <div className="rounded-t bg-primary text-white text-center py-4">
                <div className="mb-4">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" alt="User Profile" className="w-32 h-32 object-cover mx-auto rounded-full" />
                </div>
                {isEditing ? null : (
                  <button className="btn btn-outline" onClick={handleEditClick}>
                    Edit profile
                  </button>
                )}
              </div>
              {isEditing ? (
                <div className="p-4 text-black">
                  {/* Edit form fields here */}
                </div>
              ) : (
                <div className="p-4 text-black">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-normal mb-0">About</p>
                  </div>
                  <div className="p-4">
                    <p className="italic">{roomType}</p>
                    <p className="italic">{roomPrice}</p>
                    {/* Add more properties */}
                  </div>
                </div>
              )}
              <div className="p-4 text-black">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-normal mb-0">Recent photos</p>
                  {isEditing ? null : (
                    <a href="#!" className="text-muted">Show all</a>
                  )}
                </div>
                {isEditing ? null : (
                  <div className="flex justify-center">
                    {/* Display recent photos */}
                  </div>
                )}
              </div>
              {isEditing ? (
                <div className="p-4">
                  <button onClick={handleUpdateClick} className="btn btn-primary">
                    Update
                  </button>
                  <button onClick={handleCancelClick} className="btn btn-secondary">
                    Cancel
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelProfile;
