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
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useOwner } from "../contexts/ownerContext";
import { all } from "axios";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { members, bookings, addMember, editMember } = useOwner();
  const Navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      Navigate("/login");
    }
    setFranchise(user?.owner?.franchise);
    // setAllMembers(initialMembers);
  });

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
  const [allBookings, setAllBookings] = useState(bookings?.bookings);
  const [allMembers, setAllMembers] = useState(members);
  const [franchise, setFranchise] = useState(user?.owner);
  const [mem, setmem] = useState();

  useEffect(() => {
    setAllBookings(bookings?.bookings);
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

    // setAllBookings(initialBookings);
    setAllMembers(members);

    // Update franchise stats
    setFranchise((prev) => ({
      ...prev,
      stats: {
        totalBookings: initialBookings.length,
        activeMembers: members?.length,
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
  }, [members]);

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

  // useEffect(() => {
  //   if (isAddMemberOpen && mem) {
  //     console.log("add");
  //   }

  //   if (isEditMemberOpen && mem) {
  //     console.log("edit");
  //   }
  // }, [mem, isAddMemberOpen, isEditMemberOpen]);

  // Add new member
  const handleAddMember = async (e) => {
    // e.preventDefault();
    const newMember = {
      id: Date.now(),
      ...memberForm,
      visits: parseInt(memberForm.visits),
    };
    if (isAddMemberOpen && mem) {
      addMember(
        mem.name,
        mem.joinDate,
        mem.visits,
        mem.membership,
        mem.subscription,
        mem.subscriptionEnd
      );
    }

    const {
      name,
      joinDate,
      visits,
      membership,
      subscription,
      subscriptionEnd,
    } = newMember;
    // console.log(
    //   name,
    //   joinDate,
    //   visits,
    //   membership,
    //   subscription,
    //   subscriptionEnd
    // );

    // await addMember(
    //   name,
    //   joinDate,
    //   visits,
    //   membership,
    //   subscription,
    //   subscriptionEnd
    // );
    // setAllMembers((prev) => [...prev, newMember]);
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
    // e.preventDefault();
    setAllMembers((prev) =>
      prev.map((member) => {
        return member.id === currentMember.id
          ? {
              ...memberForm,
              id: currentMember.id,
              visits: parseInt(memberForm.visits),
            }
          : member;
      })
    );

    if (isEditMemberOpen && mem) {
      editMember(
        mem.name,
        mem.visits,
        mem.membership,
        mem.subscription,
        mem.subscriptionEnd
      );
    }

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
    user && (
      <div className="admin-container">
        {/* Change Password Modal */}
        <ChangePasswordModal
          isOpen={isChangePasswordOpen}
          onClose={() => setIsChangePasswordOpen(false)}
          isLoading={isLoading}
        />

        {/* Member Modal */}
        {
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
            setMemberForm1={setMemberForm}
            setmem={setmem}
            handleMemberFormChange={handleMemberFormChange}
          />
        }

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
              onAddMember={() => {
                setIsAddMemberOpen(true);
              }}
              setIsAddMemberOpen={setIsAddMemberOpen}
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
    )
  );
};

export default AdminDashboard;
