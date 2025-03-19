import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Register.css';

function Register() {
  return (
    <div className="register-container">
      <div className="overlay">
        <div className="register-box">
          <h2>Fraud Alert</h2>
          <h4>Sign Up</h4>
          <div className="register-inputs">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
          </div>
          <div className="register-button-container">
            <button type="submit">Enter</button>
          </div>
          <p>
            Already Have an Account?{' '}
            <Link to="/LoginPage" className="register-link">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;