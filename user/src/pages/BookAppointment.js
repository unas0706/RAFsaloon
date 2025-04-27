import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const services = ["Tattoo", "Haircut", "Beard Trim", "Facial"];
const locations = [
  "Downtown Salon",
  "Uptown Studio",
  "City Center Branch",
  "Suburban Spa",
];
const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const selectedService = queryParams.get("service") || "Choose Service";

  const [date, setDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Appointment booked for ${selectedService} on ${date} at ${selectedLocation} at ${selectedTime}. Contact: ${phone}`
    );
  };

  return (
    <>
      <div
        style={{
          height: "80%",
          backgroundColor: "#1a1a1a",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Book Your Appointment
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#b3b3b3",
            marginBottom: "1.5rem",
          }}
        >
          {selectedService !== "Choose Service"
            ? `Selected Service: ${selectedService}`
            : "Please select a service"}
        </p>
        <div
          style={{ width: "100%", maxWidth: "400px", marginBottom: "1.5rem" }}
        >
          <select
            value={selectedService}
            onChange={(e) =>
              navigate(`/bookappointment?service=${e.target.value}`)
            }
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "1rem",
              borderRadius: "8px",
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            <option value="Choose Service" disabled>
              Choose a Service
            </option>
            {services.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            min={new Date().toISOString().split("T")[0]}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "1rem",
              borderRadius: "8px",
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
            }}
          />
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "1rem",
              borderRadius: "8px",
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "1rem",
              borderRadius: "8px",
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            <option value="">Select Location</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "1rem",
              borderRadius: "8px",
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "1rem",
              fontWeight: "bold",
              backgroundColor: "#444",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#666")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#444")}
          >
            Confirm Booking
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default BookAppointment;
