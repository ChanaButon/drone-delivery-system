import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AuthCard from './AuthCard';
import './LoginForm.css';

const LoginForm = ({ onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // TODO: בעתיד כאן יהיה אימות אמיתי
    console.log('Login:', email, password);

    // ניווט מדומה לאתר
    navigate("/dashboardUser");
  };

  return (
    <AuthCard title="Welcome back!">
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email or Phone"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="button-submit" type="submit">
          Login
        </button>

        <div className="switch-link">
          <span>Don't have an account?</span>
          <button type="button" onClick={onSwitchToSignUp}>
            Sign Up
          </button>
        </div>
      </form>
    </AuthCard>
  );
};

export default LoginForm;
