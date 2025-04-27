import React from "react";
import { Link } from "react-router-dom";

const ServiceType = ({ url, type, sub }) => {
  return (
    <Link to="/" className="service-type">
      <img src={url} alt="" className="service-img" />
      <div className="service-txt">
        <b>{type}</b> <br />
        <div>{sub}</div>
      </div>
    </Link>
  );
};

export default ServiceType;
