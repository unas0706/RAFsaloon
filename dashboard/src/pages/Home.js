import React, { useState, useEffect } from "react";
import { FaSignOutAlt, FaBars, FaTimes, FaEdit } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import DashboardContent from "../components/DashboardContent";
import BookingsContent from "../components/BookingsContent";
import MembersContent from "../components/MembersContent";
import GalleryContent from "../components/GalleryContent";
import FranchiseContent from "../components/FranchiseContent";
import ChangePasswordModal from "../components/ChangePasswordModal";
import MemberModal from "../components/MemberModal";
import FranchiseEditModal from "../components/FranchiseEditModal";
import {
  filterBookings,
  filterMembers,
  calculateStatistics,
} from "../utility/adminUtils";

const AdminDashboard = () => {
  // State declarations
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedDate, setSelectedDate] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isEditMemberOpen, setIsEditMemberOpen] = useState(false);
  const [isEditFranchiseOpen, setIsEditFranchiseOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [memberForm, setMemberForm] = useState({
    name: "",
    joinDate: new Date().toISOString().split("T")[0],
    membership: "Standard",
    visits: 0,
    subscription: "None",
    subscriptionEnd: "",
  });

  // Initialize data with proper structure
  const [allBookings, setAllBookings] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [franchise, setFranchise] = useState({
    name: "Elite Salon",
    location: "Downtown Branch",
    owner: "Alex Johnson",
    contact: "alex@elitesalon.com",
    address: "456 Beauty Street, Downtown",
    established: "March 2021",
    stats: {
      totalBookings: 0,
      activeMembers: 0,
      monthlyRevenue: 0,
      customerRating: 0,
      reviews: [],
    },
  });

  // Load initial data
  useEffect(() => {
    // Sample bookings data
    const initialBookings = [
      {
        id: 1,
        name: "John Doe",
        date: new Date().toISOString().split("T")[0],
        time: "10:00 AM",
        service: "Haircut",
        status: "confirmed",
      },
      {
        id: 2,
        name: "Jane Smith",
        date: new Date().toISOString().split("T")[0],
        time: "2:30 PM",
        service: "Coloring",
        status: "completed",
      },
    ];

    // Sample members data
    const initialMembers = [
      {
        id: 1,
        name: "Michael Brown",
        joinDate: "2023-01-15",
        visits: 12,
        membership: "Premium",
        subscription: "Monthly",
        subscriptionEnd: "2023-12-31",
      },
      {
        id: 2,
        name: "Emily Davis",
        joinDate: "2023-03-22",
        visits: 8,
        membership: "Standard",
        subscription: "None",
        subscriptionEnd: "",
      },
    ];

    setAllBookings(initialBookings);
    setAllMembers(initialMembers);

    // Update franchise stats
    setFranchise((prev) => ({
      ...prev,
      stats: {
        totalBookings: initialBookings.length,
        activeMembers: initialMembers.length,
        monthlyRevenue: 12450,
        customerRating: 4.8,
        reviews: [
          { id: 1, rating: 5, comment: "Excellent service" },
          { id: 2, rating: 4, comment: "Very good experience" },
        ],
      },
    }));

    // Load gallery images from localStorage
    const savedImages = localStorage.getItem("salonGallery");
    if (savedImages) {
      setGalleryImages(JSON.parse(savedImages));
    }
  }, []);

  // Save gallery images to localStorage
  useEffect(() => {
    if (galleryImages.length > 0) {
      localStorage.setItem("salonGallery", JSON.stringify(galleryImages));
    }
  }, [galleryImages]);

  // Safe data processing with fallbacks
  const displayedBookings =
    filterBookings(allBookings || [], selectedDate, searchQuery) || [];
  const displayedMembers = filterMembers(allMembers || [], searchQuery) || [];
  const stats = calculateStatistics(allBookings || [], allMembers || []) || {
    todayBookingsCount: 0,
    monthlyBookingsCount: 0,
    totalMembersCount: 0,
    premiumMembersCount: 0,
    subscribedMembersCount: 0,
  };

  // Image upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const newImage = {
        id: Date.now(),
        url: event.target.result,
        name: file.name,
        uploadedAt: new Date().toISOString(),
      };
      setGalleryImages((prev) => [...prev, newImage]);
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Image delete handler
  const handleDeleteImage = (id) => {
    setGalleryImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Member form handler
  const handleMemberFormChange = (e) => {
    const { name, value } = e.target;
    setMemberForm({
      ...memberForm,
      [name]: value,
    });
  };

  // Franchise form handler
  const handleFranchiseChange = (e) => {
    const { name, value } = e.target;
    setFranchise((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save franchise edits
  const handleSaveFranchise = (e) => {
    e.preventDefault();
    setIsEditFranchiseOpen(false);
    // In a real app, you would save to API here
  };

  // Add new member
  const handleAddMember = (e) => {
    e.preventDefault();
    const newMember = {
      id: Date.now(),
      ...memberForm,
      visits: parseInt(memberForm.visits),
    };
    setAllMembers((prev) => [...prev, newMember]);
    setIsAddMemberOpen(false);
    setMemberForm({
      name: "",
      joinDate: new Date().toISOString().split("T")[0],
      membership: "Standard",
      visits: 0,
      subscription: "None",
      subscriptionEnd: "",
    });
  };

  // Edit member
  const handleEditMember = (e) => {
    e.preventDefault();
    setAllMembers((prev) =>
      prev.map((member) =>
        member.id === currentMember.id
          ? {
              ...memberForm,
              id: currentMember.id,
              visits: parseInt(memberForm.visits),
            }
          : member
      )
    );
    setIsEditMemberOpen(false);
    setCurrentMember(null);
  };

  // Delete member
  const handleDeleteMember = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setAllMembers((prev) => prev.filter((member) => member.id !== id));
    }
  };

  // Open edit member modal
  const openEditMember = (member) => {
    setCurrentMember(member);
    setMemberForm({
      name: member.name,
      joinDate: member.joinDate,
      membership: member.membership,
      visits: member.visits,
      subscription: member.subscription,
      subscriptionEnd: member.subscriptionEnd || "",
    });
    setIsEditMemberOpen(true);
  };

  return (
    <div className="admin-container">
      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        isLoading={isLoading}
      />

      {/* Member Modal */}
      <MemberModal
        isOpen={isAddMemberOpen || isEditMemberOpen}
        onClose={() => {
          setIsAddMemberOpen(false);
          setIsEditMemberOpen(false);
        }}
        onSubmit={isAddMemberOpen ? handleAddMember : handleEditMember}
        member={currentMember}
        isEdit={isEditMemberOpen}
        isLoading={isLoading}
        memberForm={memberForm}
        handleMemberFormChange={handleMemberFormChange}
      />

      {/* Franchise Edit Modal */}
      <FranchiseEditModal
        isOpen={isEditFranchiseOpen}
        onClose={() => setIsEditFranchiseOpen(false)}
        onSubmit={handleSaveFranchise}
        franchise={franchise}
        handleFranchiseChange={handleFranchiseChange}
      />

      {/* Mobile Header */}
      <div className="mobile-header">
        <button
          className="menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <h2>Salon Admin</h2>
        <button className="logout-btn-mobile">
          <FaSignOutAlt />
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        franchise={franchise}
        setIsChangePasswordOpen={setIsChangePasswordOpen}
      />

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          <h1>
            {activeTab === "dashboard" && "Dashboard Overview"}
            {activeTab === "bookings" && "Booking Management"}
            {activeTab === "members" && "Member Management"}
            {activeTab === "gallery" && "Salon Gallery"}
            {activeTab === "franchise" && "Franchise Details"}
          </h1>

          {activeTab !== "franchise" && activeTab !== "members" && (
            <div className="date-filter">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              {selectedDate && (
                <button onClick={() => setSelectedDate("")}>Clear</button>
              )}
            </div>
          )}

          {activeTab === "members" && (
            <button onClick={() => setIsAddMemberOpen(true)}>Add Member</button>
          )}
        </header>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <DashboardContent
            stats={stats}
            displayedBookings={displayedBookings}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedDate={selectedDate}
          />
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <BookingsContent
            bookings={displayedBookings}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedDate={selectedDate}
          />
        )}

        {/* Members Tab */}
        {activeTab === "members" && (
          <MembersContent
            members={displayedMembers}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onEditMember={openEditMember}
            onDeleteMember={handleDeleteMember}
            onAddMember={() => setIsAddMemberOpen(true)}
          />
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <GalleryContent
            galleryImages={galleryImages}
            handleImageUpload={handleImageUpload}
            handleDeleteImage={handleDeleteImage}
            isLoading={isLoading}
          />
        )}

        {/* Franchise Tab */}
        {activeTab === "franchise" && (
          <div className="franchise-tab-container">
            <div className="franchise-header">
              <h2>Franchise Details</h2>
              <button
                className="edit-franchise-btn"
                onClick={() => setIsEditFranchiseOpen(true)}
              >
                <FaEdit /> Edit Franchise
              </button>
            </div>
            <FranchiseContent franchise={franchise} />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
