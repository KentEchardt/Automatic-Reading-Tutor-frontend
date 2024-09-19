import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Alert from '@material-ui/lab/Alert';

const UserProfile = ({ username, email, role, changePassword }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const isValidPassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleChangePassword = async () => {
    if (!isValidPassword(newPassword)) {
      setPasswordError('Password must be at least 8 characters, include a letter, a number, and a special character.');
      setTooltipOpen(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      setTooltipOpen(true);
      return;
    }

    try {
      await changePassword(oldPassword, newPassword);
      setError('');
      alert('Password changed successfully.');
    } catch (err) {
      setError(err.message || 'An error occurred while changing the password.');
    }
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-info">
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Role:</strong> {role}</p>
      </div>
      
      <div className="password-section">
        <h3>Change Password</h3>
        {error && <Alert severity="error">{error}</Alert>}
        <div>
          <label>Current Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <label>New Password:</label>
          <Tooltip
            title={passwordError}
            open={tooltipOpen}
            onClose={() => setTooltipOpen(false)}
            onOpen={() => setTooltipOpen(true)}
            arrow
          >
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setPasswordError('');
                setTooltipOpen(false);
              }}
            />
          </Tooltip>
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
    </div>
  );
};

export default UserProfile;
