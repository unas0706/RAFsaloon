import React from "react";
import {
  FaCalendarAlt,
  FaUsers,
  FaUserTie,
  FaMoneyBillWave,
  FaSearch,
} from "react-icons/fa";

const DashboardContent = ({
  stats = {
    todayBookingsCount: 0,
    monthlyBookingsCount: 0,
    totalMembersCount: 0,
    premiumMembersCount: 0,
    subscribedMembersCount: 0,
  },
  displayedBookings = [],
  searchQuery = "",
  setSearchQuery = () => {},
  selectedDate = "",
}) => {
  const {
    todayBookingsCount,
    monthlyBookingsCount,
    totalMembersCount,
    premiumMembersCount,
    subscribedMembersCount,
  } = stats;

  return (
    <div className="dashboard-content">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaCalendarAlt />
          </div>
          <div className="stat-info">
            <h3>Today's Bookings</h3>
            <p>{todayBookingsCount}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaCalendarAlt />
          </div>
          <div className="stat-info">
            <h3>Monthly Bookings</h3>
            <p>{monthlyBookingsCount}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>Total Members</h3>
            <p>{totalMembersCount}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaUserTie />
          </div>
          <div className="stat-info">
            <h3>Premium Members</h3>
            <p>{premiumMembersCount}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaMoneyBillWave />
          </div>
          <div className="stat-info">
            <h3>Subscribed Members</h3>
            <p>{subscribedMembersCount}</p>
          </div>
        </div>
      </div>

      <div className="recent-bookings">
        <h2>
          {selectedDate ? `Bookings for ${selectedDate}` : "Recent Bookings"}
        </h2>
        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {displayedBookings.length > 0 ? (
          <div className="bookings-list">
            {displayedBookings.map((booking) => (
              <div key={booking.id} className="booking-item">
                <div className="booking-time">{booking.time}</div>
                <div className="booking-details">
                  <h4>{booking.name}</h4>
                  <p>{booking.service}</p>
                </div>
                <div className={`booking-status ${booking.status}`}>
                  {booking.status}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            No bookings found{selectedDate ? ` for ${selectedDate}` : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
