import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Gallery from "./pages/Gallery";
import Appointment from "./pages/Appointment";
import Franchise from "./pages/Franchise";
import Membership from "./pages/Membership";
import BookAppointment from "./pages/BookAppointment";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/appointment" element={<Appointment />}></Route>
          <Route path="/franchise" element={<Franchise />}></Route>
          <Route path="/membership" element={<Membership />}></Route>
          <Route path="/bookappointment" element={<BookAppointment />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
