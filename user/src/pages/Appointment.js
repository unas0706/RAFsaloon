import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const services = [
  {
    name: "Tattoo",
    description: "Unique and custom tattoo designs by expert artists.",
    price: "$100",
    image: "tattoo.jpg",
  },
  {
    name: "Haircut",
    description: "A professional haircut tailored to your style.",
    price: "$25",
    image: "hair.jpg",
  },
  {
    name: "Beard Trim",
    description: "Expert beard shaping and grooming.",
    price: "$15",
    image: "beard.jpg",
  },
  {
    name: "Facial",
    description: "Relaxing facial treatment for glowing skin.",
    price: "$40",
    image: "facial.jpg",
  },
];

const Appointment = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#000",
          color: "#fff",
          minHeight: "100vh",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "2rem" }}
        >
          Book Your Appointment
        </h1>
        <p
          style={{ fontSize: "1.2rem", color: "#b3b3b3", marginBottom: "3rem" }}
        >
          Choose a service to proceed with your appointment booking.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {services.map((service, index) => (
            <Link
              to={`/bookappointment?service=${service.name.toLowerCase()}`}
              key={index}
              style={{
                backgroundColor: "#222",
                padding: "2rem",
                borderRadius: "10px",
                minWidth: "250px",
                maxWidth: "300px",
                textAlign: "center",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
                textDecoration: "none",
                color: "#fff",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0px 8px 20px rgba(255, 255, 255, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0px 4px 10px rgba(255, 255, 255, 0.1)";
              }}
            >
              <img
                src={service.image}
                alt={service.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                }}
              />
              <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
                {service.name}
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#b3b3b3",
                  marginBottom: "0.5rem",
                }}
              >
                {service.description}
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                {service.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Appointment;
