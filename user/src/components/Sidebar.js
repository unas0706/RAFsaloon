import React from "react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div id="sidebar">
      <RxCross2
        id="cross"
        onClick={() => {
          document.getElementById("sidebar").style.left = "-100%";
        }}
      />

      <ul className="sidebar-menu">
        <li className="nav-link side-link ">
          <Link to="/">Home</Link>
        </li>
        <hr className="sidebar-hr" />
        <li className="nav-link side-link">
          <Link to="/appointment">Appointment</Link>
        </li>
        <hr className="sidebar-hr" />
        <li className="nav-link side-link">
          <Link to="/membership">Membership</Link>
        </li>
        <hr className="sidebar-hr" />
        <li className="nav-link side-link">
          <Link to="/franchise">Franchise</Link>
        </li>
        {/* <hr className="sidebar-hr" /> */}
        {/* <li className="nav-link side-link">
          <Link to="/gallery">Gallery</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
