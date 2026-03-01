import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth-function";
import droneImg from '../../assets/drone.png';
import './LoginForm.css';

const LoginForm = ({ onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const data = await loginUser({
      email,
      password
    });

    if (data.user.role === "admin") {
      
      navigate("/adminDashboard");
    } else {
      console.log(data.user.role)
      navigate("/userDashboard");
    }

  } catch (err) {
    alert("Invalid credentials");
  }
};
  

  return (
  <div className="auth-page">
    <div className="auth-card-login">
      <img
        src={droneImg}
        alt="Drone delivery"
        className="auth-image"
      />

      <h1>Welcome back!</h1>

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
          <button type="button" onClick={() => navigate("/register")}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
);
}

export default LoginForm;
