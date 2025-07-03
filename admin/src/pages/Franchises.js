import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFranchises } from "../services/api";

const Franchises = () => {
  const [franchises, setFranchises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFranchises = async () => {
      try {
        const data = await getFranchises();
        setFranchises(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFranchises();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="franchises-page">
      <div className="page-header">
        <h1>Franchises</h1>
        <Link to="/create-franchise" className="btn btn-primary">
          Add New Franchise
        </Link>
      </div>

      <div className="franchises-grid">
        {franchises.map((franchise) => {
          console.log(franchise);

          return (
            <div key={franchise._id} className="franchise-card">
              <h3>{franchise.name}</h3>
              <p>{franchise.address}</p>
              <p>Status: {franchise.status}</p>
              <div className="franchise-actions">
                <Link
                  to={`/franchise/${franchise._id}`}
                  className="btn btn-info"
                >
                  View
                </Link>
                <Link
                  to={`/franchise/${franchise._id}/edit`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Franchises;
