import React, { useState } from 'react';

const PackageDetails = () => {
  const [packages, setPackages] = useState([
    {
      id: 1,
      category: 'Category 1',
      place: 'Place 1',
      shortDescription: 'Short description 1',
      detailedDescription: 'Detailed description 1',
      images: [],
      duration: 5,
      price: 100,
    },
    {
      id: 2,
      category: 'Category 2',
      place: 'Place 2',
      shortDescription: 'Short description 2',
      detailedDescription: 'Detailed description 2',
      images: [],
      duration: 7,
      price: 150,
    },
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({});
  const [editedPackage, setEditedPackage] = useState({});

  const handleEdit = (packageIndex) => {
    // Open the edit modal and set the selected package
    setSelectedPackage(packages[packageIndex]);
    setEditModalIsOpen(true);
  };

  const openModal = (packg) => {
    // Open the details modal and set the selected package
    setSelectedPackage(packg);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    // Close the details and edit modals
    setModalIsOpen(false);
    setEditModalIsOpen(false);
  };

  const saveEdits = () => {
    // Save the edited package and close the edit modal
    setPackages((prevPackages) => {
      const updatedPackages = [...prevPackages];
      const index = updatedPackages.findIndex((pkg) => pkg.id === selectedPackage.id);
      updatedPackages[index] = editedPackage;
      return updatedPackages;
    });
    setEditModalIsOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Travel Packages</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Place</th>
              <th className="px-4 py-2">Short Description</th>
              <th className="px-4 py-2">Detailed Description</th>
              <th className="px-4 py-2">Images</th>
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
                <td className="px-4 py-2">{item.place}</td>
                <td className="px-4 py-2">{item.shortDescription}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-blue-500 hover:underline hover:text-blue-700 font-semibold py-1 px-2 rounded-lg border border-blue-500"
                    onClick={() => openModal(item)}
                  >
                    View Details
                  </button>
                </td>
                <td className="px-4 py-2">{item.images.length}</td>
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

      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Detailed Description</h2>
            <p>{selectedPackage.detailedDescription}</p>
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
        <label htmlFor="category" className="block text-gray-700">Category</label>
        <input
          type="text"
          className="form-input"
          id="category"
          name="category"
          value={editedPackage.category}
          onChange={(e) => setEditedPackage({ ...editedPackage, category: e.target.value })}
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
    className="bg-gray-400 hover:bg-gray-600 text-white font-semibold py-1 px-2 rounded"
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
