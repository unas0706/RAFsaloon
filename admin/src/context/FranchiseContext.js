import React, { createContext, useContext, useState } from 'react';

const FranchiseContext = createContext();

export const useFranchise = () => {
  const context = useContext(FranchiseContext);
  if (!context) {
    throw new Error('useFranchise must be used within a FranchiseProvider');
  }
  return context;
};

export const FranchiseProvider = ({ children }) => {
  // Franchise state
  const [franchises, setFranchises] = useState([
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

  // Member state
  const [members] = useState({
    total: 1250,
    active: 1180,
    premium: 320,
    regular: 930,
    growth: '+12%'
  });

  // Franchise actions
  const addFranchise = (newFranchise) => {
    setFranchises(prev => [...prev, { ...newFranchise, id: prev.length + 1 }]);
  };

  const updateFranchise = (id, updatedData) => {
    setFranchises(prev => 
      prev.map(franchise => 
        franchise.id === id ? { ...franchise, ...updatedData } : franchise
      )
    );
  };

  const deleteFranchise = (id) => {
    setFranchises(prev => prev.filter(franchise => franchise.id !== id));
  };

  const value = {
    franchises,
    members,
    addFranchise,
    updateFranchise,
    deleteFranchise
  };

  return (
    <FranchiseContext.Provider value={value}>
      {children}
    </FranchiseContext.Provider>
  );
}; 