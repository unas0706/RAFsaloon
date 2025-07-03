import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useOwner } from "../contexts/ownerContext";

const FranchiseEditModal = ({
  isOpen,
  onClose,
  franchise: initialFranchise,
  onSubmit,
}) => {
  const { editFranchise } = useOwner();
  const [franchise, setFranchise] = useState({
    name: "",
    location: "",
    owner: "",
    contact: "",
    address: "",
    established: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset form when initialFranchise changes
  useEffect(() => {
    if (initialFranchise) {
      setFranchise({
        name: initialFranchise.name || "",
        location: initialFranchise.location || "",
        owner: initialFranchise.owner || "",
        contact: initialFranchise.contact || "",
        address: initialFranchise.address || "",
        established: initialFranchise.established || "",
      });
    }
  }, [initialFranchise]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFranchise((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await editFranchise(
        franchise.name,
        franchise.location,
        franchise.owner,
        franchise.contact,
        franchise.address
      );
      onClose();
    } catch (err) {
      setError(err.message || "Failed to update franchise");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  // Inline styles
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
      maxWidth: "600px",
      position: "relative",
    },
    input: {
      width: "100%",
      padding: "0.8rem",
      margin: "0.5rem 0",
      border: "1px solid #ddd",
      borderRadius: "4px",
    },
    button: {
      padding: "0.8rem 1.5rem",
      margin: "0.5rem",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Edit Franchise</h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <FaTimes size={24} />
          </button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
          <div style={{ margin: "1rem 0" }}>
            <label>Franchise Name</label>
            <input
              type="text"
              name="name"
              value={franchise.name}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div style={{ margin: "1rem 0" }}>
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={franchise.location}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div style={{ margin: "1rem 0" }}>
            <label>Owner</label>
            <input
              type="text"
              name="owner"
              value={franchise.owner}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div style={{ margin: "1rem 0" }}>
            <label>Contact Information</label>
            <input
              type="text"
              name="contact"
              value={franchise.contact}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div style={{ margin: "1rem 0" }}>
            <label>Address</label>
            <textarea
              name="address"
              value={franchise.address}
              onChange={handleInputChange}
              required
              style={{ ...styles.input, minHeight: "100px" }}
            />
          </div>

          {/* <div style={{ margin: "1rem 0" }}>
            <label>Established Date</label>
            <input
              type="date"
              name="established"
              value={franchise.established}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div> */}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "2rem",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{ ...styles.button, backgroundColor: "#e0e0e0" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                ...styles.button,
                backgroundColor: "#2196F3",
                color: "white",
              }}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FranchiseEditModal;
