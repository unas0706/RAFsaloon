import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <section className="hero hidden-xs">
        <div className="hero-div">
          <img src="facial.jpg" alt="facial img" />
        </div>
        <div className="hero-div">
          <img src="hair.jpg" alt="facial img" />
        </div>
        <div className="hero-div">
          <img src="beard.jpg" alt="facial img" />
        </div>
        <div className="hero-div">
          <img src="tattoo.jpg" alt="facial img" />
        </div>

        <div className="text">
          <h1 className="main-text">
            UNISEX BEAUTY SALON <br /> & TATTOOS STUDIO
          </h1>
          <span className="sub-text">
            Within the walls of a saloon, the air crackles with the echoes of
            laughter and the <br /> murmurs of secrets. It’s a place where the
            past and present mingle, each drink a toast <br /> to stories yet
            untold.
          </span>{" "}
          <br /> <br />
          <br />
          <Link to="/appointment" className="btn-primary">
            Appointment
          </Link>
        </div>
      </section>
      <section className="visible-xs hero hero-xs">
        <img src="beard.jpg" alt="" className="hero-img-xs" />
        <div className="text">
          <h1 className="main-text main-text-xs">
            UNISEX BEAUTY SALON & TATTOOS STUDIO
          </h1>
          <span className="sub-text sub-text-xs">
            Within the walls of a saloon, the air crackles with the echoes of
            laughter and the murmurs of secrets. It’s a place where the past and
            present mingle, each drink a toast to stories yet untold.
          </span>{" "}
          <br /> <br />
          <br />
          <Link to="/appointment" className="btn-primary">
            Appointment
          </Link>
        </div>
      </section>{" "}
    </>
  );
};

export default Hero;
