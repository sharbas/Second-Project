import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa'; // Importing check-circle icon from react-icons library


const Success = () => {
  useEffect(() => {
    // Display a success message using react-toastify
    toast.success('Payment Successful!', {
      position: 'top-right',
      autoClose: 3000, // Close the notification after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);
  const navigate=useNavigate()

  const goToHome = () => {
    // Navigate back to the home page
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-200">
    <div className="bg-white p-8 rounded shadow-md text-center flex flex-col items-center w-1/2 h-1/3">
      <FaCheckCircle className="text-2xl text-green-500 mb-4" />
      <h2 className="text-2xl font-bold mb-4">Payment Successful</h2>
      <p>Your payment was successful! Thank you for choosing us.</p>
      <button
          className="bg-green-500 text-white p-2 mt-4 rounded hover:bg-green-700 transition duration-300 ease-in-out"
          onClick={goToHome}
        >
          Go to Home
        </button>
    </div>
    <ToastContainer />
  </div>
  );
};

export default Success;
