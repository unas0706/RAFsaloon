import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useOwner } from "../contexts/ownerContext";

const MemberModal = ({
  isOpen,
  onClose,
  onSubmit,
  member,
  isEdit,
  isLoading,
  setMemberForm1,
  setmem,
}) => {
  const [memberForm, setMemberForm] = useState({
    name: "",
    joinDate: new Date().toISOString().split("T")[0],
    membership: "Standard",
    visits: 0,
    subscription: "None",
    subscriptionEnd: "",
  });

  useEffect(() => {
    if (isEdit && member) {
      setMemberForm({
        name: member.name,
        joinDate: member.joinDate,
        membership: member.membership,
        visits: member.visits,
        subscription: member.subscription,
        subscriptionEnd: member.subscriptionEnd || "",
      });
    } else {
      setMemberForm({
        name: "",
        joinDate: new Date().toISOString().split("T")[0],
        membership: "Standard",
        visits: 0,
        subscription: "None",
        subscriptionEnd: "",
      });
    }
  }, [isEdit, member]);

  const handleMemberFormChange = (e) => {
    const { name, value } = e.target;
    setMemberForm((prev) => ({
      ...prev,
      [name]: name === "visits" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setmem(memberForm);

    // const {
    //   name,
    //   joinDate,
    //   visits,
    //   membership,
    //   subscription,
    //   subscriptionEnd,
    // } = memberForm;
    // await addMember(
    //   name,
    //   joinDate,
    //   visits,
    //   membership,
    //   subscription,
    //   subscriptionEnd
    // );
    // console.log(memberForm);
    setMemberForm1(memberForm);

    onSubmit(memberForm); // pass data to parent
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{isEdit ? "Edit Member" : "Add New Member"}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={memberForm.name}
              onChange={handleMemberFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Join Date</label>
            <input
              type="date"
              name="joinDate"
              value={memberForm.joinDate}
              onChange={handleMemberFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Membership Type</label>
            <select
              name="membership"
              value={memberForm.membership}
              onChange={handleMemberFormChange}
              required
            >
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          <div className="form-group">
            <label>Visits</label>
            <input
              type="number"
              name="visits"
              value={memberForm.visits}
              onChange={handleMemberFormChange}
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label>Subscription</label>
            <select
              name="subscription"
              value={memberForm.subscription}
              onChange={handleMemberFormChange}
              required
            >
              <option value="None">None</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annual">Annual</option>
            </select>
          </div>
          {memberForm.subscription !== "None" && (
            <div className="form-group">
              <label>Subscription End Date</label>
              <input
                type="date"
                name="subscriptionEnd"
                value={memberForm.subscriptionEnd}
                onChange={handleMemberFormChange}
                required
              />
            </div>
          )}
          <div className="form-actions">
            <button type="submit" disabled={isLoading}>
              {isLoading
                ? "Processing..."
                : isEdit
                ? "Update Member"
                : "Add Member"}
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberModal;
