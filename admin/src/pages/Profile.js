import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      // Here you would typically make an API call to update the profile
      // For now, we'll simulate a successful update
      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        setShowEditModal(false);
        setSuccess('');
      }, 2000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      // Here you would typically make an API call to change the password
      // For now, we'll simulate a successful password change
      setSuccess('Password changed successfully!');
      setTimeout(() => {
        setShowPasswordModal(false);
        setSuccess('');
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }, 2000);
    } catch (err) {
      setError('Failed to change password. Please try again.');
    }
  };

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>{title}</h3>
            <button onClick={onClose} className="modal-close">&times;</button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="header-section">
        <h2>Profile</h2>
      </div>
      
      <div className="form-section">
        <div className="form-grid">
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              value={user?.name || ''} 
              readOnly 
              className="profile-input"
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={user?.email || ''} 
              readOnly 
              className="profile-input"
            />
          </div>
        </div>

        <div className="form-actions">
          <button 
            className="action-btn"
            onClick={() => setShowEditModal(true)}
          >
            Edit Profile
          </button>
          <button 
            className="action-btn"
            onClick={() => setShowPasswordModal(true)}
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)}
        title="Edit Profile"
      >
        <form onSubmit={handleEditSubmit} className="modal-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">Save Changes</button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Change Password Modal */}
      <Modal 
        isOpen={showPasswordModal} 
        onClose={() => setShowPasswordModal(false)}
        title="Change Password"
      >
        <form onSubmit={handlePasswordSubmit} className="modal-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">Change Password</button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => setShowPasswordModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile; 