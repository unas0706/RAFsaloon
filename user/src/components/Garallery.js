import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Garallery = () => {
  return (
    <section className="garallery-sec">
      <header className="header " style={{ height: "10%" }}>
        Our &nbsp;<span className="theme">Gallery</span>
      </header>
      <div className="sub-head">
        "Step into our gallery and witness the art of transformation—where every
        cut, color, and style tells a story."
      </div>

      <div className="gallery">
        <section className="main">
          <img src="hair.jpg" alt="" className="main-img" />
        </section>
        <section className="sub-main">
          <section className="sub-main-1">
            <img src="beard.jpg" alt="" className="main-img" />
          </section>
          <section className="sub-main-1">
            <img src="tattoo.jpg" alt="" className="main-img" />
          </section>
        </section>
      </div>

      <div className="view-more">
        <Link to="/gallery"> View More</Link>&nbsp;&nbsp;
        <FaArrowRightLong />
      </div>
    </section>
  );
};

export default Garallery;
