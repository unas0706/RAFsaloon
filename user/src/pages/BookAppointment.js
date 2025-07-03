import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import userApi from "../API/UserApi";
import axios from "axios";

const services = ["Tattoo", "Haircut", "Beard Trim", "Facial"];
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
  const service = queryParams.get("service") || "Choose Service";

  const [date, setDate] = useState("");
  const [franchise, setFranchise] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getFranchiseNames = async () => {
      try {
        const res = await userApi.get("api/franchise/getFranchiseNames");

        setLocations(res.data.franchises); // assuming data is an array of franchises
      } catch (err) {
        console.error("Failed to load franchise names:", err);
      }
    };

    getFranchiseNames();
    console.log(locations);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (service === "Choose Service") {
      alert("Please select a service before booking.");
      return;
    }

    try {
      const res = await userApi.post("api/bookings/", {
        service,
        date,
        franchise,
        time,
        phone,
      });

      if (res.status === 201) {
        alert("Appointment booked successfully!");
        navigate("/appointment");
      }
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div
        style={{
          minHeight: "80vh",
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
          {service !== "Choose Service"
            ? `Selected Service: ${service}`
            : "Please select a service"}
        </p>

        {/* Service Dropdown */}
        <div
          style={{ width: "100%", maxWidth: "400px", marginBottom: "1.5rem" }}
        >
          <select
            value={service}
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
            {services.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Booking Form */}
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
          {/* Date Picker */}
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

          {/* Time Slot Picker */}
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
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
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>

          {/* Franchise Location Picker */}
          <select
            value={franchise}
            onChange={(e) => setFranchise(e.target.value)}
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
            {locations &&
              locations.map((loc) => (
                <option key={loc._id} value={loc._id}>
                  {loc.name}
                </option>
              ))}
          </select>

          {/* Phone Number */}
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

          {/* Submit Button */}
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
