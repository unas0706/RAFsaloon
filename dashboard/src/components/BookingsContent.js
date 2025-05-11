import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const BookingsContent = ({
  bookings = [],
  searchQuery = "",
  setSearchQuery = () => {},
  selectedDate = "",
}) => {
  const [localBookings, setLocalBookings] = useState([]);

  useEffect(() => {
    setLocalBookings(bookings);
  }, [bookings]);

  const handleStatusChange = (id, newStatus) => {
    const updated = localBookings.map((booking) =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setLocalBookings(updated);
  };

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
        <p>Showing {localBookings.length} bookings</p>
      </div>
      {localBookings.length > 0 ? (
        <div className="bookings-table">
          <div className="table-header">
            <div>Date</div>
            <div>Time</div>
            <div>Customer</div>
            <div>Service</div>
            {/* <div>Status</div> */}
          </div>
          {localBookings.map((booking) => (
            <div key={booking.id} className="table-row">
              <div>{booking.date}</div>
              <div>{booking.time}</div>
              <div>{booking.phone}</div>
              <div>{booking.service}</div>
              {/* <div>
                <select
                  value={booking.status}
                  onChange={(e) =>
                    handleStatusChange(booking.id, e.target.value)
                  }
                  className={`status ${booking.status}`}
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div> */}
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
