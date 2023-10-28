import React, { useState } from 'react';
import './PackageDetails.css';

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

  const handleEdit = (packageIndex) => {
    // Handle the edit action for the selected package here
  };

  return (
    <div className="package-list">
      <h2>Travel Packages</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Place</th>
            <th>Short Description</th>
            <th>Detailed Description</th>
            <th>Images</th>
            <th>Duration (in days)</th>
            <th>Price</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.category}</td>
              <td>{item.place}</td>
              <td>{item.shortDescription}</td>
              <td>{item.detailedDescription}</td>
              <td>{item.images.length}</td>
              <td>{item.duration}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackageDetails;
