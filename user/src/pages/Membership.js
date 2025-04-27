import React from "react";
import Footer from "../components/Footer";

const Membership = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#000",
          color: "#fff",
          height: "max-content",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        {/* Hero Section */}
        <div
          style={{ maxWidth: "900px", margin: "0 auto", paddingBottom: "3rem" }}
        >
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Become a Prestige Member
          </h1>
          <p
            style={{ fontSize: "1.3rem", color: "#b3b3b3", lineHeight: "1.6" }}
          >
            Unlock a world of luxury grooming with our exclusive membership
            plans. Enjoy priority bookings, special discounts, VIP perks, and
            much more. Choose the perfect plan that suits your needs and elevate
            your salon experience today.
          </p>
        </div>

        {/* Membership Tiers */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {["Silver", "Gold", "Platinum"].map((tier, index) => (
            <div
              key={index}
              style={{
                backgroundColor: index === 1 ? "#888" : "#222",
                padding: "2rem",
                borderRadius: "10px",
                minWidth: "300px",
                maxWidth: "350px",
                flex: "1 1 300px",
                textAlign: "left",
                boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                transform: index === 1 ? "scale(1.1)" : "scale(1)",
                textAlign: "center",
                position: "relative",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0px 8px 20px rgba(255, 255, 255, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform =
                  index === 1 ? "scale(1.1)" : "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0px 4px 10px rgba(255, 255, 255, 0.1)";
              }}
            >
              <h2 style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>
                {tier}
              </h2>
              <h3
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                  color: "#fff",
                }}
              >
                {tier === "Silver"
                  ? "$19.99/month"
                  : tier === "Gold"
                  ? "$39.99/month"
                  : "$59.99/month"}
              </h3>
              <ul
                style={{
                  fontSize: "1.1rem",
                  color: "#b3b3b3",
                  lineHeight: "1.5",
                  paddingLeft: "20px",
                  textAlign: "left",
                }}
              >
                {tier === "Silver" && (
                  <>
                    <li>10% off on all salon services</li>
                    <li>Exclusive monthly deals</li>
                    <li>Welcome gift upon joining</li>
                    <li>Access to seasonal offers</li>
                    <li>Limited-time discounts</li>
                    <li>Affordable premium grooming</li>
                  </>
                )}
                {tier === "Gold" && (
                  <>
                    <li>20% off on services</li>
                    <li>Priority bookings</li>
                    <li>Free grooming consultations</li>
                    <li>Annual complimentary haircut</li>
                    <li>Free product samples</li>
                    <li>Exclusive VIP salon event invites</li>
                  </>
                )}
                {tier === "Platinum" && (
                  <>
                    <li>30% off on services</li>
                    <li>VIP lounge access</li>
                    <li>Free monthly treatments</li>
                    <li>Personalized styling recommendations</li>
                    <li>Premium skincare and haircare products</li>
                    <li>One-on-one expert consultations</li>
                  </>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Membership;
