import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateFranchise = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    status: 'Pending',
    contact: '',
    phone: '',
    openingDate: '',
    manager: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to create the franchise
    // For now, we'll simulate a successful creation
    alert('Franchise created successfully!');
    navigate('/franchises');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="form-container">
      <div className="header-section">
        <h2>Create New Franchise</h2>
        <button 
          className="action-btn back" 
          onClick={() => navigate('/franchises')}
        >
          Back to List
        </button>
      </div>

      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Franchise Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter franchise name"
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Enter location"
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="form-group">
              <label>Opening Date</label>
              <input
                type="date"
                name="openingDate"
                value={formData.openingDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Contact Email</label>
              <input
                type="email"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                placeholder="Enter contact email"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter phone number"
              />
            </div>
            <div className="form-group">
              <label>Manager</label>
              <input
                type="text"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                required
                placeholder="Enter manager name"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Create Franchise
          </button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/franchises')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFranchise; 