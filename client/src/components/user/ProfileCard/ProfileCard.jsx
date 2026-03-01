import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../api/user-function";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import "./ProfileCard.css";

const ProfileCard = () => {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser
  });

  const [activeTab, setActiveTab] = useState("personal");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load profile</p>;
  const firstName = user?.name?.split(" ")[0] || "User";
  const lastName = user?.name?.split(" ")[1] || "User";

  return (
   <div className="profile">
  <div className="profile-card">

    <div className="profile-tabs">
      <button
        className={activeTab === "personal" ? "active" : ""}
        onClick={() => setActiveTab("personal")}
      >
        Personal Info
      </button>
      <button
        className={activeTab === "address" ? "active" : ""}
        onClick={() => setActiveTab("address")}
      >
        Address
      </button>
    </div>

    <div className="profile-content">
      {activeTab === "personal" && (
  <div className="tab-content personal-grid">
    <div className="field">
      <p><strong>First Name:</strong> {firstName}</p>
    </div>
    <div className="field">
      <p><strong>Last Name:</strong> {lastName}</p>
    </div>
    <div className="field">
      <p><strong>Email:</strong> {user.email}</p>
      <button className="change-password">Change Password</button>
    </div>
    <div className="field">
      <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>
    </div>
  </div>
)}

      {activeTab === "address" && (
  <div className="tab-content address-row">
    <p><strong>Address:</strong> {user.address || "Not address"}</p>
    <button className="edit-btn">
      <span>Edit</span>
      <EditSquareIcon fontSize="small" />
    </button>
  </div>
)}
    </div>
  </div>
</div>
  );
};

export default ProfileCard;