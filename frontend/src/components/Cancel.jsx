import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
  const navigate = useNavigate();

  const goToPackageAndDestination = () => {
    // Navigate back to the home page
    navigate('/packages&destination');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-red-200">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Cancel</h2>
        <p>Your payment was canceled.</p>
        <button
          className="bg-red text-white p-2 mt-4 rounded"
          onClick={goToPackageAndDestination}
        >
          Back to Package And Destination
        </button>
      </div>
    </div>
  );
};

export default Cancel;
