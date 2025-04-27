import React from "react";

const FranchiseContent = ({ franchise = {}, stats = {} }) => {
  // Safely destructure with defaults
  const {
    name = "",
    location = "",
    owner = "",
    contact = "",
    address = "",
    established = "",
    stats: franchiseStats = {
      totalBookings: 0,
      activeMembers: 0,
      monthlyRevenue: 0,
      customerRating: 0,
      reviews: [],
    },
  } = franchise;

  return (
    <div className="franchise-content">
      <div className="franchise-card">
        <h2>Franchise Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <label>Franchise Name</label>
            <p>{name}</p>
          </div>
          <div className="info-item">
            <label>Location</label>
            <p>{location}</p>
          </div>
          <div className="info-item">
            <label>Owner</label>
            <p>{owner}</p>
          </div>
          <div className="info-item">
            <label>Contact</label>
            <p>{contact}</p>
          </div>
          <div className="info-item">
            <label>Address</label>
            <p>{address}</p>
          </div>
          <div className="info-item">
            <label>Established</label>
            <p>{established}</p>
          </div>
        </div>
      </div>

      <div className="performance-card">
        <h2>Performance Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-item">
            <label>Total Bookings</label>
            <p>{franchiseStats.totalBookings}</p>
          </div>
          <div className="metric-item">
            <label>Active Members</label>
            <p>{franchiseStats.activeMembers}</p>
          </div>
          <div className="metric-item">
            <label>Monthly Revenue</label>
            <p>${franchiseStats.monthlyRevenue.toLocaleString()}</p>
          </div>
          <div className="metric-item">
            <label>Customer Rating</label>
            <p>
              {franchiseStats.customerRating} ★ ({franchiseStats.reviews.length}{" "}
              reviews)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FranchiseContent;
