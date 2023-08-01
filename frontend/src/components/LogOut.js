// LogOut.js
import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const LogOut = ({ handleLogout }) => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    handleLogout(); // Call the callback function to update isLoggedIn in App component
    navigate('/login');
  };

  return (
    <div>
      <Button variant="outlined" color="error" onClick={handleLogOut}>
        logout
      </Button>
    </div>
  );
};

export default LogOut;
