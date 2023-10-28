import React, { useState } from 'react';
import './PackageAddForm.css'
const PackageAddForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    place: '',
    shortDescription: '',
    detailedDescription: '',
    images: [],
    duration: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const selectedImages = Array.from(e.target.files);
      setFormData({ ...formData, images: selectedImages });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // You can send this data to your server or perform any necessary actions
  };

  return (
    
    <div className="package-form" style={{backgroundColor:'rgb(11 142 140)'}} >
      <h2>Add Travel Package</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="place">Place</label>
          <input
            type="text"
            className="form-control"
            id="place"
            name="place"
            value={formData.place}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="shortDescription">Short Description</label>
          <textarea
            className="form-control"
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="detailedDescription">Detailed Description</label>
          <textarea
            className="form-control"
            id="detailedDescription"
            name="detailedDescription"
            value={formData.detailedDescription}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="images">Images</label>
          <input
            type="file"
            className="form-control-file"
            id="images"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration (in days)</label>
          <input
            type="number"
            className="form-control"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Package</button>
      </form>
    </div>
  );
};

export default PackageAddForm;
