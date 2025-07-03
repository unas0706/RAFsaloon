import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFranchise } from "../../context/FranchiseContext";

const EditFranchise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { franchises } = useFranchise();
  const franchise = franchises.find((franchise) => franchise._id === id);

  console.log(franchise);

  const [formData, setFormData] = useState(franchise);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the franchise
    alert("Franchise updated successfully!");
    navigate("/franchises");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="form-container">
      <div className="header-section">
        <h2>Edit Franchise</h2>
        <button
          className="action-btn back"
          onClick={() => navigate(`/franchise/${id}`)}
        >
          Back to Details
        </button>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
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
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            {/* <div className="form-group">
              <label>Opening Date</label>
              <input
                type="date"
                name="openingDate"
                value={formData.createdAt}
                onChange={handleChange}
                required
              />
            </div> */}
          </div>
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          <div className="form-grid">
            {/* <div className="form-group">
              <label>Contact Email</label>
              <input
                type="email"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div> */}
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Manager</label>
              <input
                type="text"
                name="manager"
                value={formData.owner}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Update Franchise
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/franchises")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFranchise;
