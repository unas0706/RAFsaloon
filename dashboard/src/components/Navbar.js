import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <img
        src="logo.jpg"
        alt="Logo"
        className="logo"
        onClick={() => {
          navigate("/");
        }}
      />

      <ul className="nav-links hidden-xs">
        <li className="nav-link ">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-link">
          <Link to="/appointment">Appointment</Link>
        </li>
        <li className="nav-link">
          <Link to="/membership">Membership</Link>
        </li>
        <li className="nav-link">
          <Link to="/franchise">Franchise</Link>
        </li>
        <li className="nav-link">
          <Link to="/gallery">Gallery</Link>
        </li>
      </ul>
      <div className="menu-con visible-xs">
        <BiMenu
          className="visible-xs"
          id="menu"
          onClick={() => {
            document.getElementById("sidebar").style.left = "0";
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
