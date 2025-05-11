import React from "react";
import {
  FaChartPie,
  FaCalendarAlt,
  FaUsers,
  FaImage,
  FaStore,
  FaUserTie,
  FaLock,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = ({
  activeTab,
  setActiveTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  franchise,
  setIsChangePasswordOpen,
}) => {
  const { logout } = useAuth();
  return (
    <aside className={`sidebar ${isMobileMenuOpen ? "open" : ""}`}>
      <div className="sidebar-content">
        <div className="franchise-info">
          <h3>{franchise.name}</h3>
          <p className="location">{franchise.location}</p>
          <div className="owner-info">
            <FaUserTie />
            <span>{franchise.owner}</span>
          </div>
        </div>

        <nav className="main-nav">
          <ul>
            {[
              { id: "dashboard", icon: <FaChartPie />, label: "Dashboard" },
              { id: "bookings", icon: <FaCalendarAlt />, label: "Bookings" },
              { id: "members", icon: <FaUsers />, label: "Members" },
              { id: "gallery", icon: <FaImage />, label: "Gallery" },
              { id: "franchise", icon: <FaStore />, label: "Franchise" },
            ].map((tab) => (
              <li
                key={tab.id}
                className={activeTab === tab.id ? "active" : ""}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button onClick={() => setIsChangePasswordOpen(true)}>
            <FaLock />
            <span>Change Password</span>
          </button>
          <button
            className="logout-btn"
            onClick={async () => {
              await logout();
            }}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
