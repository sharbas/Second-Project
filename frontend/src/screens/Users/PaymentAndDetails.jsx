import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCloseOutline,  } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import userAxiosInstance from "../../utils/userAxiosInstance.js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate, useParams,  } from "react-router-dom";

const PaymentAndDetails = () => {
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
 
  
  const {category,place,bookedUserId}=useParams()
  
  const [packagePrice, setPackagePrice] = useState(null);
  const [hotelDetails, setHotelDetails] = useState([]);
  const [clients, setClients] = useState([
    {
      id: uuidv4(),
      name: "",
      passportNumber: "",
      expireDate: "",
      clientDOB: "",
      phoneNumber: "",
      gender: "",
      clientPhoto: "",
      passportFrontPhoto: "",
      passportBackPhoto: "",
    },
  ]);

  const navigate=useNavigate()
  const [flightDate, setFlightDate] = useState(null);
  const [selectedHotelId, setSelectedHotelId] = useState(null);



  const handleFlightDateChange = (date) => {
    setFlightDate(date);
  };

  const handleAddClient = () => {
    setClients((prevClients) => [
      ...prevClients,
      {
        id: uuidv4(),
        name: "",
        passportNumber: "",
        expireDate: "",
        clientDOB: "",
        phoneNumber: "",
        gender: "",
        clientPhoto: "",
        passportFrontPhoto: "",
        passportBackPhoto: "",
      },
    ]);
  };

  const handleInputChange = (clientId, field, value) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === clientId ? { ...client, [field]: value } : client
      )
    );
  };

  const handleFileChange = (clientId, field, file) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === clientId ? { ...client, [field]: file } : client
      )
    );
  };

  const handleCloseClient = (clientId) => {
    setClients(clients.filter((client) => client.id !== clientId));
  };

  // const submitHandler = async (e) => {
  //   // e.preventDefault();
  //   // try {
  //   //   console.log("this is submitHandler");
  //   //   const formData = new FormData();

  //   //   // Add common data outside the loop (if any)
  //   //   formData.append("selectedHotel", selectedHotel);
  //   //   formData.append("flightDate", flightDate);

  //   //   // Loop through clients array and append data to FormData
  //   //   clients.forEach((client, index) => {
  //   //     formData.append(`clients[${index}][id]`, client.id);
  //   //     formData.append(`clients[${index}][name]`, client.name);
  //   //     formData.append(
  //   //       `clients[${index}][passportNumber]`,
  //   //       client.passportNumber
  //   //     );
  //   //     formData.append(`clients[${index}][expireDate]`, client.expireDate);
  //   //     formData.append(`clients[${index}][clientDOB]`, client.clientDOB);
  //   //     formData.append(`clients[${index}][phoneNumber]`, client.phoneNumber);
  //   //     formData.append(`clients[${index}][gender]`, client.gender);

  //   //     // Append files separately (if needed)
  //   //     formData.append(`clientPhotos[${index}]`, client.clientPhoto);
  //   //     formData.append(
  //   //       `passportFrontPhotos[${index}]`,
  //   //       client.passportFrontPhoto
  //   //     );
  //   //     formData.append(
  //   //       `passportBackPhotos[${index}]`,
  //   //       client.passportBackPhoto
  //   //     );
  //   //   });

  //   //   // Log FormData entries
  //   //   for (let pair of formData.entries()) {
  //   //     console.log(pair[0] + ": " + pair[1]);
  //   //   }
  //   // } catch (error) {

  //   // }
  // };

  useEffect(() => {
    const fetchHotelAndPackagedDetails = async () => {
      try {
        const res = await userAxiosInstance.get(
          `/fetchHotelAndPackagedDetails?category=${category}&place=${place}`
        );

        setHotelDetails(res.data.hotelDetails);
        setPackagePrice(res.data.packagePrice);
      } catch (error) {
        error.message("there is an error occured when you fetchhotel details");
      }
    };
    fetchHotelAndPackagedDetails();
  }, []);

  const handleBookPackageAndHotel = async (e) => {
    try {
      // Validation
      if (!selectedHotelId || !flightDate) {
        alert("Please select a hotel and provide a flight date.");
        return;
      }

      // Additional validation for client input fields
      const isClientsValid = clients.every(
        (client) =>
          client.name &&
          client.passportNumber &&
          client.expireDate &&
          client.clientDOB &&
          client.gender &&
          client.clientPhoto &&
          client.passportFrontPhoto &&
          client.passportBackPhoto
      );

      if (!isClientsValid) {
        alert("Please fill in all the client details.");
        return;
      }

      const stripe = await loadStripe(
        "pk_test_51OChr2SCTDTk7maXNiRPEQ8BBODD8pO5RSK8qNuEG2npGmZwKMmPVFDVu0ukvfHYGElMMq68Lq2XqGYVqG51pPlV00a6XAqEHM"
      );

      e.preventDefault();
      console.log("this is submitHandler");
      const formData = new FormData();

      // Add common data outside the loop (if any)
      formData.append("selectedHotelId", selectedHotelId);
      formData.append("flightDate", flightDate);

      // Loop through clients array and append data to FormData
      clients.forEach((client, index) => {
        formData.append(`clients[${index}][id]`, client.id);
        formData.append(`clients[${index}][name]`, client.name);
        formData.append(
          `clients[${index}][passportNumber]`,
          client.passportNumber
        );
        formData.append(`clients[${index}][expireDate]`, client.expireDate);
        formData.append(`clients[${index}][clientDOB]`, client.clientDOB);
        formData.append(`clients[${index}][phoneNumber]`, client.phoneNumber);
        formData.append(`clients[${index}][gender]`, client.gender);

        // Append files separately (if needed)
        formData.append(`clientPhotos[${index}]`, client.clientPhoto);
        formData.append(
          `passportFrontPhotos[${index}]`,
          client.passportFrontPhoto
        );
        console.log(client.passportFrontPhoto, "jjjjjjj");
        console.log(client.passportBackPhoto, "hhhhh");

        formData.append(
          `passportBackPhotos[${index}]`,
          client.passportBackPhoto
        );

        // if (Array.isArray(client.clientPhoto) && client.clientPhoto.length > 0) {
        //   client.clientPhoto.forEach((photo, photoIndex) => {
        //     // Append each file with a unique key
        //     formData.append(`clientPhotos[${index}][${photoIndex}]`, photo);
        //   });
        // }

        // Check if client.passportFrontPhoto is an array before using forEach
        // if (Array.isArray(client.passportFrontPhoto) && client.passportFrontPhoto.length > 0) {
        //   client.passportFrontPhoto.forEach((frontPhoto, frontPhotoIndex) => {
        //     // Append each file with a unique key
        //     formData.append(`passportFrontPhotos[${index}][${frontPhotoIndex}]`, frontPhoto);
        //   });
        // }

        // Check if client.passportBackPhoto is an array before using forEach
        // if (Array.isArray(client.passportBackPhoto) && client.passportBackPhoto.length > 0) {
        //   client.passportBackPhoto.forEach((backPhoto, backPhotoIndex) => {
        //     // Append each file with a unique key
        //     formData.append(`passportBackPhotos[${index}][${backPhotoIndex}]`, backPhoto);
        //   });
        // }
      });

      // Log FormData entries
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      // Send API request
      const response = await userAxiosInstance.post(
        `/bookPackageAndHotel?bookedUserId=${bookedUserId}`,
        formData
      );
      const session = response.data.id;
      const result = await stripe.redirectToCheckout({
        sessionId: session,
      });
      if (result.error) {
        console.log(result.error);
      }
      // Handle response as needed
      console.log("aaa response success ann tta");
      // Update state to show payment details
      setShowPaymentDetails(true);
    } catch (error) {
      console.error("Error booking package and hotel:", error);
    }
  };

  // const handleHotelSelection = (hotelId) => {
  //   setSelectedHotel(hotelId);
  // };
 // console.log('this is chatHandler');
        // // Introduce a 1000ms (1 second) delay
        // const delay = 1000;
  
        // // Using Promise with setTimeout to create a delay
        // const delayPromise = () => new Promise(resolve => setTimeout(resolve, delay));
  
        // // Await the delay before making the API call
        // await delayPromise();
const chatHandler=(e)=>{
  e.preventDefault()
  createChatRoom()
}
 
  const createChatRoom = async () => {

      try { 
        console.log('this chathanlger');
        let res = await userAxiosInstance.post(`/get-or-createroom?hotelId=${selectedHotelId}`);
        console.log(res,'this is res');
          navigate(`/chats/${res.data._id}`)
     
      } catch (error) {
        console.error('Error creating or getting room:', error);
      }
 
  };
  


  return (
    <section className="p-4 px-5 lg:px-0 bg-userBgColor">
      <div
        className=" text-center md:text-left w-full max-w-[1400px] mx-auto rounded-lg shadow-2xl shadow-outer p-5 "
        style={{ backgroundImage: 'url("/detailsBg7.jpg")' }}
      >
        <h3 className="text-headingColor text-[22px] leading-9 font-bold">
          Payment <span className="text-primaryColor">Details</span>
        </h3>
      </div>

      <div
        className=" m-3 md:flex-col w-full max-w-[1400px] mx-auto rounded-lg shadow-2xl shadow-outer p-5"
        style={{ backgroundImage: 'url("/detailsBg7.jpg")' }}
      >
        <form
          // onSubmit={submitHandler} // Replace with your submit handler
          encType="multipart/form-data"
          className="md:flex md:justify-between md:mx-[60px] items-start" // Change justify-between to items-start
        >
          <div className="border border-black px-2 m-2 md:w-1/2 w-full ">
            {clients.map((client) => (
              <div key={client.id} className="mb-4">
                <br />
                <p className="text-blue-500 text-lg font-bold mb-2 mt-10"></p>
                <button
                  className="bg-red-500 text-white p-2 mb-2 rounded"
                  onClick={() => handleCloseClient(client.id)}
                >
                  <IoCloseOutline className="text-xl" />
                </button>
                <hr className="border-b-2 border-black mb-4" />

                {/* Client input fields */}
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                 Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your Name"
                  name="name"
                  onChange={(e) =>
                    handleInputChange(client.id, "name", e.target.value)
                  }
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none mb-2"
                />
                <label
                  htmlFor="passportNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                Passprot Number
                </label>
                <input
                  type="text"
                  placeholder="Passport Number"
                  name="passportNumber"
                  onChange={(e) =>
                    handleInputChange(
                      client.id,
                      "passportNumber",
                      e.target.value
                    )
                  }
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none mb-2"
                />
                <label
                  htmlFor="expireDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expiry Date Of Passport
                </label>
                <input
                  type="text"
                  id="expireDate"
                  placeholder="dd-mm-yyyy"
                  value={client.expireDate}
                  pattern="\d{2}-\d{2}-\d{4}"
                  onChange={(e) =>
                    handleInputChange(client.id, "expireDate", e.target.value)
                  }
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none mb-2"
                />

                <label
                  htmlFor="DOB"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date Of Birth
                </label>
                <DatePicker
                  placeholderText="DOB"
                  selected={
                    client.clientDOB ? new Date(client.clientDOB) : null
                  }
                  onChange={(date) =>
                    handleInputChange(client.id, "clientDOB", date)
                  }
                  dateFormat="yyyy-MM-dd"
                  maxDate={new Date()} // restrict to dates less than or equal to the current date
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none mb-2"
                />
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Phone Number (Optional)"
                  value={client.phoneNumber}
                  onChange={(e) =>
                    handleInputChange(client.id, "phoneNumber", e.target.value)
                  }
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none mb-2"
                />
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  value={client.gender}
                  onChange={(e) =>
                    handleInputChange(client.id, "gender", e.target.value)
                  }
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none mb-2"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>

                {/* Upload your Photo */}

                <div className="flex mt-10">
                  <div className="mb-2 h-40 me-2 bg-blue-300 w-1/2 rounded-lg">
                    <img
                      src={
                        client.clientPhoto
                          ? URL.createObjectURL(client.clientPhoto)
                          : `https://www.wetravels.online/images/${client.clientPhoto}`
                      }
                      className="w-full h-full rounded-lg"
                      alt={[]}
                    />
                  </div>
                  <div className="mb-2 ms-2 p-4 w-1/2">
                    <label
                      htmlFor={`uploadClientPhoto-${client.id}`}
                      className="inline-block text-sm font-medium text-black dark:text-black"
                    >
                      Upload your Photo
                    </label>
                    <input
                      id={`uploadClientPhoto-${client.id}`}
                      className="relative py-1 m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-blue-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-blue-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-blue-100 file:px-3 file:py-[0.32rem] file:text-blue-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-blue-200 focus:border-primary focus:text-blue-700 focus:shadow-te-primary focus:outline-none dark:border-blue-600 dark:text-blue-200 dark:file:bg-blue-700 dark:file:text-blue-100 dark:focus:border-primary"
                      onChange={(e) =>
                        handleFileChange(
                          client.id,
                          "clientPhoto",
                          e.target.files[0]
                        )
                      }
                      accept="image/*"
                      type="file"
                    />
                  </div>
                </div>

                {/* ... Other client input fields ... */}

                <div className="flex mt-10">
                  {/* Passport Front Image */}
                  <div className="mb-2 h-40 me-2 bg-blue-300 w-1/2 rounded-lg">
                    <img
                      src={
                        client.passportFrontPhoto
                          ? URL.createObjectURL(client.passportFrontPhoto)
                          : `https://www.wetravels.online/images/${client.passportFrontPhoto}`
                      }
                      className="w-full h-full rounded-lg"
                      alt={[]}
                    />
                    <label
                      htmlFor={`uploadPassportFront-${client.id}`}
                      className="block mt-2 text-sm font-medium  text-black dark:text-blue-200"
                    >
                      Upload Passport Front
                    </label>
                    <input
                      id={`uploadPassportFront-${client.id}`}
                      className="relative py-1 m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-blue-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-blue-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-blue-100 file:px-3 file:py-[0.32rem] file:text-blue-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-blue-200 focus:border-primary focus:text-blue-700 focus:shadow-te-primary focus:outline-none dark:border-blue-600 dark:text-blue-200 dark:file:bg-blue-700 dark:file:text-blue-100 dark:focus:border-primary"
                      onChange={(e) =>
                        handleFileChange(
                          client.id,
                          "passportFrontPhoto",
                          e.target.files[0]
                        )
                      }
                      accept="image/*"
                      type="file"
                    />
                  </div>

                  {/* Passport Back Image */}
                  <div className=" h-40  me-2 bg-blue-300 w-1/2 rounded-lg ">
                    <img
                      src={
                        client.passportBackPhoto
                          ? URL.createObjectURL(client.passportBackPhoto)
                          : `https://www.wetravels.online/images/${client.passportBackPhoto}`
                      }
                      className="w-full h-full rounded-lg"
                      alt={[]}
                    />
                    <label
                      htmlFor={`uploadPassportBack-${client.id}`}
                      className="block mt-2 text-sm font-medium text-black dark:text-blue-200"
                    >
                      Upload Passport Back
                    </label>
                    <input
                      id={`uploadPassportBack-${client.id}`}
                      className="relative py-1 m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-blue-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-blue-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-blue-100 file:px-3 file:py-[0.32rem] file:text-blue-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-blue-200 focus:border-primary focus:text-blue-700 focus:shadow-te-primary focus:outline-none dark:border-blue-600 dark:text-blue-200 dark:file:bg-blue-700 dark:file:text-blue-100 dark:focus:border-primary"
                      onChange={(e) =>
                        handleFileChange(
                          client.id,
                          "passportBackPhoto",
                          e.target.files[0]
                        )
                      }
                      accept="image/*"
                      type="file"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              className="mt-20 mb-10 bg-blue-500 text-white p-2 rounded"
              onClick={handleAddClient}
            >
              <FaPlus className="text-xl" />
            </button>
          </div>

          <div className=" w-full md:w-1/2 mt-1">
            <label className="block mb-2">
              Select Flight Arriving Date&Time:
            </label>
            <DatePicker
              placeholderText="Select Flight Date and Time"
              selected={flightDate}
              onChange={handleFlightDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              minDate={new Date()} // Set minimum date to the current date
              className="border border-black p-2 mb-2"
              required
            />

            <select
              onChange={(e) => setSelectedHotelId(e.target.value)}
              className="border border-black p-2 mb-2 ml-10"
            >
              <option value="">Select Hotel</option>
              {hotelDetails.map((hotel) => (
                <option key={hotel._id} value={hotel._id}>
                  {hotel.hotelName}
                </option>
              ))}
            </select>

            {selectedHotelId !== null && (
              <div className="flex border border-black p-4 mb-4">
                <div className="w-1/2 pr-4">
                  <h2>Hotel Details</h2>
                  {/* Use directly selectedHotelId */}
                  <>
                    <p>
                      Name:{" "}
                      {
                        hotelDetails.find(
                          (hotel) => hotel._id === selectedHotelId
                        ).hotelName
                      }
                    </p>
                    <p>
                      Price: ₹
                      {
                        hotelDetails.find(
                          (hotel) => hotel._id === selectedHotelId
                        ).roomPrice
                      }
                      /month
                    </p>
                    <p>
                      Room Type:{" "}
                      {
                        hotelDetails.find(
                          (hotel) => hotel._id === selectedHotelId
                        ).roomType
                      }
                    </p>
                    <p>
                      Speciality:{" "}
                      {
                        hotelDetails.find(
                          (hotel) => hotel._id === selectedHotelId
                        ).speciality
                      }
                    </p>
                    <p>
                      Package Location:{" "}
                      {
                        hotelDetails.find(
                          (hotel) => hotel._id === selectedHotelId
                        ).packageLocation
                      }
                    </p>
                    <p>
                      Address:{" "}
                      {
                        hotelDetails.find(
                          (hotel) => hotel._id === selectedHotelId
                        ).address
                      }
                    </p>
                    <p>
                      Contact Number:{" "}
                      {
                        hotelDetails.find(
                          (hotel) => hotel._id === selectedHotelId
                        ).contactNumber
                      }
                    </p>
                    {/* ... Add other hotel details */}
                    <button
                      className="mt-4 bg-yellow-300 hover:bg-yellow-400 text-white p-2 rounded"
                      onClick={(e)=>chatHandler(e)}
                    >
                      Chat with Hotel
                    </button>
                  </>
                </div>
                <div className="w-1/2">
                  <h2>Hotel Images</h2>
                  <div className="flex flex-wrap">
                    {hotelDetails
                      .find((hotel) => hotel._id === selectedHotelId)
                      ?.images.map((image, index) => (
                        <img
                          key={index}
                          src={`https://www.wetravels.online/images/${image}`}
                          alt={`hotel-image-${index}`}
                          className="w-1/2 h-24 object-cover p-2 rounded border border-black"
                        />
                      ))}
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded"
              onClick={handleBookPackageAndHotel}
            >
              Book Package and Hotel
            </button>
          </div>
        </form>
        {showPaymentDetails && (
          <div className="border-2 border-black p-4 mb-4 mt-10">
            <h2 className="text-lg font-semibold mb-2">Payment Details</h2>
            <p>Individual Client Price: ${packagePrice}</p>
            <p className="mb-4">
              Total Price for {clients.length} Clients: ₹
              {packagePrice * clients.length}
            </p>
            <p>
              Hotel Price: ₹
              {
                hotelDetails.find((hotel) => hotel.hotelName === selectedHotel)
                  ?.price
              }
            </p>
            <p>
              Total Price: ₹
              {packagePrice * clients.length +
                hotelDetails.find((hotel) => hotel.hotelName === selectedHotel)
                  ?.price}
            </p>
            {/* ... Add more payment details based on your requirements */}
          </div>
        )}
      </div>
    </section>
  );
};

export default PaymentAndDetails;
