import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFranchise } from "../../context/FranchiseContext";

const FranchiseList = () => {
  const navigate = useNavigate();

  const { franchises } = useFranchise();

  // Franchise state
  const [franchisesList] = useState(franchises);

  // Handle franchise actions
  const handleViewFranchise = (id) => {
    navigate(`/franchise/${id}`);
  };

  const handleEditFranchise = (id) => {
    navigate(`/franchise/${id}/edit`);
  };

  return (
    <div className="franchise-list-page">
      <div className="header-section">
        <h2>Franchises</h2>
        <button
          className="action-btn create"
          onClick={() => navigate("/create-franchise")}
        >
          Create New Franchise
        </button>
      </div>

      {
        <div className="franchise-grid">
          {franchisesList &&
            franchisesList.map((franchise) => {
              return (
                <div key={franchise._id} className="franchise-card">
                  <div className="franchise-header">
                    <h4>{franchise.name}</h4>
                    <span
                      className={`status-badge ${franchise.status?.toLowerCase()}`}
                    >
                      {franchise.status}
                    </span>
                  </div>
                  <div className="franchise-info">
                    <p>
                      <strong>Location:</strong> {franchise.location}
                    </p>
                    <p>
                      <strong>Total Members:</strong> {franchise.members}
                    </p>
                    <p>
                      <strong>Active Members:</strong> {franchise.activeMembers}
                    </p>
                  </div>
                  <div className="franchise-actions">
                    <button
                      className="action-btn view"
                      onClick={() => handleViewFranchise(franchise._id)}
                    >
                      View Details
                    </button>
                    {/* <button
                      className="action-btn edit"
                      onClick={() => handleEditFranchise(franchise._id)}
                    >
                      Edit
                    </button> */}
                  </div>
                </div>
              );
            })}
        </div>
      }
    </div>
  );
};

export default FranchiseList;
