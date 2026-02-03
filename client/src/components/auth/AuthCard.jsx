import React from 'react';
import './AuthCard.css';
import droneImg from '../../assets/drone.png';

const AuthCard = ({ title, children }) => {
  return (
    <div className="auth-card">
      <img
        src={droneImg}
        alt="Drone delivery"
        className="auth-image"
      />
      <h2 className="auth-card-title">{title}</h2>
      {children}
    </div>
  );
};

export default AuthCard;
