import React from "react";
import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const MembersContent = ({
  members = [],
  searchQuery = "",
  setSearchQuery = () => {},
  onEditMember = () => {},
  onDeleteMember = () => {},
  setIsAddMemberOpen,
}) => {
  return (
    <div className="members-content">
      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="members-header">
        <h2>Registered Members</h2>
        <button
          className="add-member-btn"
          onClick={() => {
            setIsAddMemberOpen(true);
          }}
        >
          <FaPlus /> Add Member
        </button>
        <p>Showing {members.length} members</p>
      </div>
      {members.length > 0 ? (
        <div className="members-table">
          <div className="table-header">
            <div>Name</div>
            <div>Join Date</div>
            <div>Membership</div>
            <div>Subscription</div>
            <div>Visits</div>
            <div>Actions</div>
          </div>
          {members.map((member) => (
            <div key={member.id} className="table-row">
              <div>{member.name}</div>
              <div>{member.joinDate}</div>
              <div className={`membership ${member.membership.toLowerCase()}`}>
                {member.membership}
              </div>
              <div
                className={`subscription ${member.subscription.toLowerCase()}`}
              >
                {member.subscription}
                {member.subscription !== "None" && member.subscriptionEnd && (
                  <span className="subscription-end">
                    (until {member.subscriptionEnd})
                  </span>
                )}
              </div>
              <div>{member.visits}</div>
              <div className="actions">
                <button
                  className="edit-btn"
                  onClick={() => onEditMember(member)}
                >
                  <FaEdit />
                </button>
                {/* <button
                  className="delete-btn"
                  onClick={() => onDeleteMember(member.id)}
                >
                  <FaTrash />
                </button> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">No members found</div>
      )}
    </div>
  );
};

export default MembersContent;
