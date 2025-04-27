import React from "react";
import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#111",
        color: "#fff",
        padding: "4rem 2rem",
        textAlign: "center",
        width: "100%",
        margin: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          textAlign: "left",
        }}
      >
        {/* About Us */}
        <div>
          <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>About Us</h3>
          <p style={{ fontSize: "1rem", color: "#b3b3b3" }}>
            We are a premium salon franchise offering world-class grooming
            services and business opportunities. Our goal is to create a
            high-quality, profitable salon network.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
            Quick Links
          </h3>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "1rem" }}>
            <li>
              <a href="/" style={{ color: "#b3b3b3", textDecoration: "none" }}>
                Home
              </a>
            </li>
            <li>
              <a
                href="/franchise"
                style={{ color: "#b3b3b3", textDecoration: "none" }}
              >
                Franchise
              </a>
            </li>
            <li>
              <a
                href="/services"
                style={{ color: "#b3b3b3", textDecoration: "none" }}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/contact"
                style={{ color: "#b3b3b3", textDecoration: "none" }}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
            Contact Us
          </h3>
          <p style={{ fontSize: "1rem", color: "#b3b3b3" }}>
            📍 123 Salon Street, Business City, Country
          </p>
          <p style={{ fontSize: "1rem", color: "#b3b3b3" }}>
            📞 +1 234 567 890
          </p>
          <p style={{ fontSize: "1rem", color: "#b3b3b3" }}>
            📧 support@saloonfranchise.com
          </p>
        </div>

        {/* Embedded Google Map */}
        <div>
          <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Location</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245165.68734475825!2d79.90599201640626!3d16.235143400000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a81ed74bfbb75%3A0xe8fd1dc77c67819c!2sRAF%20Hair%20House!5e0!3m2!1sen!2sin!4v1742712943523!5m2!1sen!2sin"
            width="100%"
            height="200"
            style={{ borderRadius: "10px", border: "none" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Social Media Links */}
      <div style={{ marginTop: "3rem" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Follow Us</h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <a
            href="#"
            style={{
              color: "#b3b3b3",
              fontSize: "1.8rem",
              textDecoration: "none",
            }}
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            style={{
              color: "#b3b3b3",
              fontSize: "1.8rem",
              textDecoration: "none",
            }}
          >
            <FaInstagram />
          </a>
          <a
            href="mailto:support@saloonfranchise.com"
            style={{
              color: "#b3b3b3",
              fontSize: "1.8rem",
              textDecoration: "none",
            }}
          >
            <FaEnvelope />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <p
        style={{
          marginTop: "3rem",
          fontSize: "1rem",
          color: "#777",
          borderTop: "1px solid #333",
          paddingTop: "1rem",
        }}
      >
        © {new Date().getFullYear()} Salon Franchise. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
