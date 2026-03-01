import React from "react";
import { useNavigate } from "react-router-dom";
import droneImg from '../../assets/drone.png';
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img
            src={droneImg}
            onClick={() => navigate("/")}
            alt="Drone delivery"
            className="nav-image"
               />
           <span className="logo-black">Dro</span>
           <span className="logo-blue">nix</span>
        </div>
        <div className="navbar-links">
          <a href="#">Nice to meet you</a>
          <a href="#">how it works</a>
          <a href="#">price list</a>
          <a href="#">Contact us</a>
          <a href="#">Support</a>
        </div>
        <div className="navbar-actions">
          <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="join-btn" onClick={() => navigate("/register")}>I'll start here</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
