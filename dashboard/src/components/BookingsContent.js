import React from "react";
import { FaSearch } from "react-icons/fa";

const BookingsContent = ({
  bookings = [],
  searchQuery = "",
  setSearchQuery = () => {},
  selectedDate = "",
}) => {
  return (
    <div className="bookings-content">
      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search bookings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="bookings-header">
        <h2>
          {selectedDate ? `Bookings for ${selectedDate}` : "All Bookings"}
        </h2>
        <p>Showing {bookings.length} bookings</p>
      </div>
      {bookings.length > 0 ? (
        <div className="bookings-table">
          <div className="table-header">
            <div>Date</div>
            <div>Time</div>
            <div>Customer</div>
            <div>Service</div>
            <div>Status</div>
          </div>
          {bookings.map((booking) => (
            <div key={booking.id} className="table-row">
              <div>{booking.date}</div>
              <div>{booking.time}</div>
              <div>{booking.name}</div>
              <div>{booking.service}</div>
              <div className={`status ${booking.status}`}>{booking.status}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          No bookings found{selectedDate ? ` for ${selectedDate}` : ""}
        </div>
      )}
    </div>
  );
};

export default BookingsContent;
