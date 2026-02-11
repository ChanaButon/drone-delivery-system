import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AuthCard from './AuthCard';
import './SignUpForm.css';

const SignUpForm = ({ onSwitchToLogin }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
   const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('SignUp:', fullName, email, password);

    navigate("/adminDashboard");
  };

  return (
    <AuthCard title="Create New Account">
      <form className="signup-form" onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="phone"
          placeholder="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='button-submit' type="submit">Sign Up</button>
        <div className="switch-link">
          <span>Already have an account?</span>
          <button type="button" onClick={onSwitchToLogin}>Login</button>
        </div>
      </form>
    </AuthCard>
  );
};

export default SignUpForm;
