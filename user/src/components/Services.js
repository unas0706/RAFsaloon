import React from "react";
import ServiceType from "./ServiceType";

const Services = () => {
  return (
    <section className="services">
      <header className="header">
        Our&nbsp; <span className="theme">Services</span>
      </header>

      <div className="services-body">
        <ServiceType
          url="scissors (1).png"
          type="Hair Cut"
          sub="In the saloon, a haircut is a statement, shaping not just your look but your mood and confidence"
        />
        <ServiceType
          url="face-treatment.png"
          type="Facials"
          sub="In the saloon, facials are more than a treatment—they’re a moment of relaxation and rejuvenation amidst the clamor of everyday life"
        />
        <ServiceType
          url="tattoo-studio.png"
          type="Tattoos"
          sub="In the saloon, tattoos are more than ink; they’re a canvas of personal history and bold statements"
        />
      </div>
    </section>
  );
};

export default Services;
