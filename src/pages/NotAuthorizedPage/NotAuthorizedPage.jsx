import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotAuthorizedPage.scss'; // Import the CSS file for styling

const NotAuthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-authorized-container">
      <h1 className='Not-Authorized'>403 - Not Authorized</h1>
      <p className='para'>Sorry, you don't have permission to view this page.</p>
      <div className="buttons">
        <button onClick={() => navigate('/')} className="home-button">
          Go to Home
        </button>
        <button onClick={() => navigate('/login')} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default NotAuthorizedPage;
