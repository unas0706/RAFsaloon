import React from "react";

const Gallery = () => {
  return (
    <main className="gallery-main">
      <header className="filter">
        <label htmlFor="gender">Select Gender :&nbsp;</label>
        <select name="" id="gender">
          <option value="All">ALL</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label htmlFor="type">Select Type :&nbsp;</label>
        <select name="" id="type">
          <option value="All">ALL</option>
          <option value="hair">Haircut</option>
          <option value="tattoo">Tattoos</option>
        </select>
      </header>

      <section className="gallery-sec">
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="hair.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
        <img src="beard.jpg" alt="" className="gallery-img" loading="lazy" />
      </section>
    </main>
  );
};

export default Gallery;
