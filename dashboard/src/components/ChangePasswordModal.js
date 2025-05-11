import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const ChangePasswordModal = ({ isOpen, onClose, isLoading }) => {
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    // DEMONSTRATION ONLY - NEVER LOG PASSWORDS IN PRODUCTION
    console.log("Old Password:", passwordForm.oldPassword);
    console.log("New Password:", passwordForm.newPassword);
    console.log("Confirm Password:", passwordForm.confirmPassword);

    // Add actual password change logic here
    onClose();
  };

  if (!isOpen) return null;

  // Inline Styles
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modal: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "8px",
      width: "90%",
      maxWidth: "450px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      position: "relative",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1.5rem",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      marginBottom: "1rem",
    },
    label: {
      fontSize: "0.9rem",
      color: "#555",
    },
    input: {
      padding: "0.8rem",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "1rem",
      width: "100%",
    },
    buttonGroup: {
      display: "flex",
      gap: "1rem",
      marginTop: "1.5rem",
    },
    primaryButton: {
      backgroundColor: "#3182ce",
      color: "white",
      border: "none",
      padding: "0.8rem 1.5rem",
      borderRadius: "4px",
      cursor: "pointer",
      flex: 1,
    },
    secondaryButton: {
      backgroundColor: "#e2e8f0",
      color: "#333",
      border: "none",
      padding: "0.8rem 1.5rem",
      borderRadius: "4px",
      cursor: "pointer",
      flex: 1,
    },
    closeButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "0.5rem",
      color: "#666",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#333" }}>
            Change Password
          </h2>
          <button style={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleChangePassword}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Current Password</label>
            <input
              type="password"
              name="oldPassword"
              value={passwordForm.oldPassword}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="submit"
              style={styles.primaryButton}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={styles.secondaryButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
