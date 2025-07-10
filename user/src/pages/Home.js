import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Barbers from "../components/Barbers";
import Garallery from "../components/Garallery";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <main>
        <Hero />
        <Services />
        <Barbers />
        {/* <Garallery /> */}
        <Footer />
      </main>
    </>
  );
};

export default Home;
