import React from "react";
import { FaTimes } from "react-icons/fa";

const FranchiseEditModal = ({
  isOpen,
  onClose,
  onSubmit,
  franchise,
  handleFranchiseChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Franchise Information</h2>
          <button onClick={onClose} className="close-btn">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Franchise Name</label>
            <input
              type="text"
              name="name"
              value={franchise.name}
              onChange={handleFranchiseChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={franchise.location}
              onChange={handleFranchiseChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Owner</label>
            <input
              type="text"
              name="owner"
              value={franchise.owner}
              onChange={handleFranchiseChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact Email</label>
            <input
              type="email"
              name="contact"
              value={franchise.contact}
              onChange={handleFranchiseChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={franchise.address}
              onChange={handleFranchiseChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Established Date</label>
            <input
              type="text"
              name="established"
              value={franchise.established}
              onChange={handleFranchiseChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FranchiseEditModal;
