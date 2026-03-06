import React from "react";
import "./ProfileCard.css";

const PersonalTab = ({ user, setShowPasswordPopup }) => {
  const firstName = user?.name?.split(" ")[0] || "User";
  const lastName = user?.name?.split(" ")[1] || "User";

  return (
    <div className="tab-content personal-grid">
      <div className="field">
        <p><strong>First Name:</strong> {firstName}</p>
      </div>
      <div className="field">
        <p><strong>Last Name:</strong> {lastName}</p>
      </div>
      <div className="field">
        <p><strong>Email:</strong> {user.email}</p>
        <button className="change-password" onClick={() => setShowPasswordPopup(true)}>
          Change Password
        </button>
      </div>
      <div className="field">
        <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>
      </div>
    </div>
  );
};

export default PersonalTab;