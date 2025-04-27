import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const ChangePasswordModal = ({ isOpen, onClose, isLoading }) => {
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Password change logic
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Change Password</h2>
          <button onClick={onClose} className="close-btn">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleChangePassword}>
          {/* Form fields */}
          <div className="form-actions">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Password"}
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
