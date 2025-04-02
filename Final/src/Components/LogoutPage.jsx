import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('tableNumber');

    // Redirect to the login page
    navigate('/LoginPage');
  }, [navigate]);

  return (
    <div>
      <h2>You have been logged out successfully</h2>
    </div>
  );
}

export default LogoutPage;
