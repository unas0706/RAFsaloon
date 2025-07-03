import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFranchise } from "../../context/FranchiseContext";

const ViewFranchise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { franchises } = useFranchise();

  // Mock data - in a real app, this would come from an API
  // const franchise = {
  //   id: id,
  //   name: "Downtown Branch",
  //   location: "City Center",
  //   status: "Active",
  //   contact: "downtown@rafsaloon.com",
  //   phone: "+1 234-567-8900",
  //   openingDate: "2023-01-15",
  //   manager: "John Doe",
  //   members: {
  //     total: 156,
  //     active: 142,
  //     newThisMonth: 8,
  //     premium: 45,
  //     regular: 111,
  //   },
  // };

  const franchise = franchises.find((franchise) => franchise._id === id);

  return (
    <div className="franchise-details">
      <div className="header-section">
        <h2>Franchise Details</h2>
        <div className="header-actions">
          {/* <button
            className="action-btn edit"
            onClick={() => navigate(`/franchise/${id}/edit`)}
          >
            Edit
          </button> */}
          <button
            className="action-btn back"
            onClick={() => navigate("/franchises")}
          >
            Back to List
          </button>
        </div>
      </div>

      <div className="franchise-info-card">
        <div className="info-section">
          <h3>Basic Information</h3>
          <div className="info-grid">
            <div className="info-group">
              <label>Franchise Name</label>
              <p>{franchise.name}</p>
            </div>
            <div className="info-group">
              <label>Location</label>
              <p>{franchise.location}</p>
            </div>
            <div className="info-group">
              <label>Status</label>
              <span className="status-badge">
                {franchise.status || "Active"}
              </span>
            </div>
            <div className="info-group">
              <label>Opening Date</label>
              <p>{new Date(franchise.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h3>Contact Information</h3>
          <div className="info-grid">
            {/* <div className="info-group">
              <label>Contact Email</label>
              <p>{franchise.contact}</p>
            </div> */}
            <div className="info-group">
              <label>Phone Number</label>
              <p>{franchise.contact}</p>
            </div>
            <div className="info-group">
              <label>Manager</label>
              <p>{franchise.owner}</p>
            </div>
          </div>
        </div>

        {/* <div className="info-section">
          <h3>Members Overview</h3>
          <div className="members-grid">
            <div className="member-stat-card">
              <div className="stat-value">{franchise.members.total}</div>
              <div className="stat-label">Total Members</div>
            </div>
            <div className="member-stat-card">
              <div className="stat-value">{franchise.members.active}</div>
              <div className="stat-label">Active Members</div>
            </div>
            <div className="member-stat-card">
              <div className="stat-value">{franchise.members.newThisMonth}</div>
              <div className="stat-label">New This Month</div>
            </div>
            <div className="member-stat-card">
              <div className="stat-value">{franchise.members.premium}</div>
              <div className="stat-label">Premium Members</div>
            </div>
            <div className="member-stat-card">
              <div className="stat-value">{franchise.members.regular}</div>
              <div className="stat-label">Regular Members</div>
            </div>
          </div>
          <div className="members-actions">
            <button className="action-btn view">View All Members</button>
            <button className="action-btn">Add New Member</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ViewFranchise;
