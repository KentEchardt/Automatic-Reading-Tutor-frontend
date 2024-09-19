import React, { useEffect, useState } from 'react';
import { Tooltip, Alert, OverlayTrigger } from 'react-bootstrap';
import HeaderComponent from './HeaderComponent';
import { changePassword, getUserDetails } from '../services/users';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [passwords, setPasswords] = useState({
    old: '',
    new: '',
    confirm: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    role: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const navigate = useNavigate()

  const isValidPassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const handlePasswordChange = (field) => (e) => {
    setPasswords(prev => ({ ...prev, [field]: e.target.value }));
    setError('');
    setTooltipOpen(false);
  };

  const handleChangePassword = async () => {
    if (!isValidPassword(passwords.new)) {
      setError('Password must be at least 8 characters, include a letter, a number, and a special character.');
      setTooltipOpen(true);
      return;
    }

    if (passwords.new !== passwords.confirm) {
      setError('Passwords do not match.');
      setTooltipOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      await changePassword(passwords.old, passwords.new);
      setSuccessMessage('Password changed successfully.');
      setPasswords({ old: '', new: '', confirm: '' });
      setCountdown(3);
      
      const countdownInterval = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(countdownInterval);
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            navigate('/login');
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
      
    } catch (err) {
      setError(err.message || 'An error occurred while changing the password.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        setUserDetails(response);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details. Please try again later.');
      }
    };
    fetchUserDetails();
  }, []);

  const containerStyle = {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
  };

  const sectionStyle = {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    wordWrap: 'break-word',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ced4da',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    maxWidth: '100%',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    textAlign: 'left',
  };

  const renderTooltip = (props) => (
    <Tooltip id="password-tooltip" {...props}>
      Password must be at least 8 characters, include a letter, a number, and a special character.
    </Tooltip>
  );

  return (
    <div>
      <HeaderComponent />
    
      <div style={containerStyle}>
        <h2 style={{ marginBottom: '30px', wordWrap: 'break-word' }}>User Profile</h2>
        
        <div style={sectionStyle}>
          <h3 style={{ marginBottom: '20px' }}>Profile Information</h3>
          <p style={{ wordBreak: 'break-all' }}><strong>Username:</strong> {userDetails.username}</p>
          <p style={{ wordBreak: 'break-all' }}><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Role:</strong> {userDetails.role}</p>
        </div>
        
        <div style={sectionStyle}>
          <h3 style={{ marginBottom: '20px' }}>Change Password</h3>
          {error && <Alert variant="danger" style={{ marginBottom: '15px', wordWrap: 'break-word' }}>{error}</Alert>}
          {successMessage && (
            <Alert variant="success" style={{ marginBottom: '15px', wordWrap: 'break-word' }}>
              {successMessage}
              {countdown !== null && ` Redirecting in ${countdown} seconds...`}
            </Alert>
          )}
          <div>
            <label htmlFor="current-password" style={labelStyle}>Current Password:</label>
            <input
              id="current-password"
              type="password"
              value={passwords.old}
              onChange={handlePasswordChange('old')}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="new-password" style={labelStyle}>New Password:</label>
            <OverlayTrigger
              placement="right"
              overlay={renderTooltip}
              trigger={['hover', 'focus']}
            >
              <input
                id="new-password"
                type="password"
                value={passwords.new}
                onChange={handlePasswordChange('new')}
                style={inputStyle}
              />
            </OverlayTrigger>
          </div>
          <div>
            <label htmlFor="confirm-password" style={labelStyle}>Confirm New Password:</label>
            <input
              id="confirm-password"
              type="password"
              value={passwords.confirm}
              onChange={handlePasswordChange('confirm')}
              style={inputStyle}
            />
          </div>
          <button 
            onClick={handleChangePassword} 
            style={{...buttonStyle, opacity: isLoading ? 0.5 : 1}}
            disabled={isLoading || countdown !== null}
          >
            {isLoading ? 'Changing Password...' : 'Change Password'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;