import React from "react";
import { useFranchise } from "../context/FranchiseContext";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { franchises, members } = useFranchise();

  // Franchise statistics
  const franchiseStats = [
    {
      title: "Total Franchises",
      value: franchises?.length,
    },
    {
      title: "Active Franchises",
      value: franchises?.filter((f) => f.status === "Active").length,
    },
  ];
  const {} = useAuth();

  // Member statistics
  const memberStats = [
    {
      title: "Total Members",
      value: members?.total,
      growth: members?.growth,
    },
    {
      title: "Active Members",
      value: members?.active,
    },
    {
      title: "Premium Members",
      value: members?.premium,
    },
    {
      title: "Regular Members",
      value: members?.regular,
    },
  ];

  const renderStatCard = (stat) => (
    <div key={stat.title} className="stat-card">
      <h4>{stat.title}</h4>
      <p className="stat-value">
        {stat.value}
        {stat.growth && <span className="growth-badge">{stat.growth}</span>}
      </p>
    </div>
  );

  return (
    franchises && (
      <div className="dashboard">
        <h2>Dashboard Overview</h2>

        <div className="stats-section">
          <h3>Franchise Overview</h3>
          <div className="stats-grid">{franchiseStats.map(renderStatCard)}</div>
        </div>

        <div className="stats-section">
          <h3>Members Overview</h3>
          <div className="stats-grid">{memberStats.map(renderStatCard)}</div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
