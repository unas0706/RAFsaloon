import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FranchiseList = () => {
  const navigate = useNavigate();

  // Franchise state
  const [franchises] = useState([
    {
      id: 1,
      name: 'Downtown Branch',
      location: 'City Center',
      status: 'Active',
      members: 156,
      activeMembers: 142
    },
    {
      id: 2,
      name: 'Westside Branch',
      location: 'West District',
      status: 'Active',
      members: 98,
      activeMembers: 92
    },
    {
      id: 3,
      name: 'Eastside Branch',
      location: 'East District',
      status: 'Active',
      members: 120,
      activeMembers: 115
    }
  ]);

  // Handle franchise actions
  const handleViewFranchise = (id) => {
    navigate(`/franchise/${id}`);
  };

  const handleEditFranchise = (id) => {
    navigate(`/franchise/${id}/edit`);
  };

  return (
    <div className="franchise-list-page">
      <div className="header-section">
        <h2>Franchises</h2>
        <button 
          className="action-btn create" 
          onClick={() => navigate('/create-franchise')}
        >
          Create New Franchise
        </button>
      </div>

      <div className="franchise-grid">
        {franchises.map(franchise => (
          <div key={franchise.id} className="franchise-card">
            <div className="franchise-header">
              <h4>{franchise.name}</h4>
              <span className={`status-badge ${franchise.status.toLowerCase()}`}>
                {franchise.status}
              </span>
            </div>
            <div className="franchise-info">
              <p><strong>Location:</strong> {franchise.location}</p>
              <p><strong>Total Members:</strong> {franchise.members}</p>
              <p><strong>Active Members:</strong> {franchise.activeMembers}</p>
            </div>
            <div className="franchise-actions">
              <button 
                className="action-btn view" 
                onClick={() => handleViewFranchise(franchise.id)}
              >
                View Details
              </button>
              <button 
                className="action-btn edit" 
                onClick={() => handleEditFranchise(franchise.id)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FranchiseList; 