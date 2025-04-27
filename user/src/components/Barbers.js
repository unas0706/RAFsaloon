import React, { useEffect, useRef } from "react";

const Barbers = () => {
  const carouselRef = useRef(null);
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy5f_UIFzY9bjWvuz9Og-Cy3_RS2aF_DfarQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLhm-YIec0jthCaSZ3Vo4YW0qrxz_SCKO7GA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMPMB-HNfBEv_vaQ7FtEaV3MDYFj3SqG3hsA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEBXfQ-GOLC2cuxlsubKsaciqy4sxH_3LnfQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI4oHgIUc5PfU5cdicNFepzr3kCt6wMp0_xg&s",
  ];
  useEffect(() => {
    const carousel = carouselRef.current;
    let scrollAmount = 0;

    const scrollCarousel = () => {
      if (carousel) {
        scrollAmount += 1; // Speed of scroll
        if (scrollAmount >= carousel.scrollWidth / 2) {
          scrollAmount = 0; // Reset scroll for infinite effect
        }
        carousel.scrollLeft = scrollAmount;
      }
    };

    const interval = setInterval(scrollCarousel, 30); // Adjust speed as needed

    return () => clearInterval(interval);
  });
  return (
    <section className="barber-sec">
      <header className="header">
        Our &nbsp;<span className="theme">Strength</span>
      </header>
      <div className="sub-head">
        Experience top-notch grooming with our team of over 20 highly trained
        barbers, dedicated to providing exceptional service at our salon
      </div>
      {/* <div className="barbers">
        <img src="beard.jpg" alt="" className="barber-img" />
        <img src="beard.jpg" alt="" className="barber-img" />
        <img src="beard.jpg" alt="" className="barber-img" />
        <img src="beard.jpg" alt="" className="barber-img" />
        <img src="beard.jpg" alt="" className="barber-img" />
        <img src="beard.jpg" alt="" className="barber-img" />
      </div> */}

      <div className="barbers-wrapper">
        <div className="barbers" ref={carouselRef}>
          {images.concat(images).map((img, index) => (
            <img key={index} src={img} alt="Barber" className="barber-img" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Barbers;
