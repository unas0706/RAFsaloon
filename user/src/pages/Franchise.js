import React from "react";
import Footer from "../components/Footer";

const Franchise = () => {
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
        {/* Hero Section */}
        <div
          style={{ maxWidth: "900px", margin: "0 auto", paddingBottom: "3rem" }}
        >
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Start Your Own Successful Salon!
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#b3b3b3" }}>
            Join our premium salon franchise and become a part of a thriving
            business. We provide everything you need—training, professional
            barbers, top-notch facilities, and business guidance. With our
            proven business model and brand reputation, success is within reach.
          </p>
        </div>

        {/* Franchise Features */}
        {[
          {
            title: "Comprehensive 6-Month Training",
            image: "beard.jpg",
            content:
              "Our in-depth training covers hairstyling techniques, customer service, and business management. Hands-on workshops and expert mentorship ensure you gain the skills needed to run a successful salon. You will learn about advanced hair care treatments, salon hygiene protocols, and customer engagement strategies to maximize satisfaction and revenue.",
          },
          {
            title: "Modern Salon Setup",
            image: "saloon.jpeg",
            content:
              "We provide stylish and comfortable salon interiors with high-quality grooming tools. Our modern ambiance attracts premium clients, ensuring your salon stands out in the industry. We also assist in selecting ergonomic furniture, energy-efficient lighting, and aesthetic décor to create a luxurious yet practical space.",
          },
          {
            title: "Access to Expert Barbers",
            image: "hair.jpg",
            content:
              "We recruit and train the best barbers in the industry. With their expertise in modern haircuts, beard styling, and grooming trends, your salon will be known for its excellence. Our team undergoes continuous skill enhancement programs to stay updated with international grooming standards.",
          },
          {
            title: "Complete Marketing & Branding Support",
            image: "logo.jpg",
            content:
              "We offer branding and marketing strategies to attract customers. From social media campaigns to digital promotions, we help establish your salon’s identity and increase profitability. Our marketing team will guide you in running targeted advertisements, seasonal offers, and referral programs to keep clients coming back.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#222",
              padding: "2rem",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
              margin: "2rem auto",
              maxWidth: "900px",
              textAlign: "left",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={feature.image}
              alt={feature.title}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <h2 style={{ fontSize: "2rem", margin: "1rem 0" }}>
              {feature.title}
            </h2>
            <p style={{ fontSize: "1.2rem", color: "#b3b3b3" }}>
              {feature.content}
            </p>
          </div>
        ))}

        {/* FAQ Section */}
        <div
          style={{ maxWidth: "800px", margin: "3rem auto", textAlign: "left" }}
        >
          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Frequently Asked Questions
          </h2>
          {[
            {
              question: "What is the total investment required?",
              answer:
                "The investment varies based on location and salon size. We offer flexible financing options. Our team will provide a detailed cost breakdown including rent, equipment, and marketing expenses.",
            },
            {
              question: "Will I get help in setting up the salon?",
              answer:
                "Yes! We assist with location selection, interior design, and branding to ensure a smooth launch. Our support includes supplier recommendations and legal compliance guidance.",
            },
            {
              question: "Do I need experience in the salon industry?",
              answer:
                "No prior experience is required. Our training and operational support make running the business easy. We provide detailed operational manuals and 24/7 support to help you navigate daily challenges.",
            },
            {
              question: "How long does it take to launch a salon franchise?",
              answer:
                "The process typically takes 3-6 months, depending on location readiness and hiring. We ensure a structured roadmap so you can start generating revenue as soon as possible.",
            },
          ].map((faq, index) => (
            <details
              key={index}
              style={{
                marginBottom: "1.5rem",
                borderBottom: "1px solid #666",
                paddingBottom: "1rem",
              }}
            >
              <summary
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "#e0e0e0",
                  cursor: "pointer",
                }}
              >
                {faq.question}
              </summary>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#c7c7c7",
                  marginTop: "0.5rem",
                }}
              >
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        {/* Call to Action */}
        {/* <div style={{ marginTop: "3rem" }}>
          <button
            style={{
              backgroundColor: "#fff",
              color: "#000",
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#b3b3b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
          >
            Apply for a Franchise Now
          </button>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default Franchise;
