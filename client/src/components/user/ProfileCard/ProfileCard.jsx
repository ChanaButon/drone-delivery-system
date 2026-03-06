import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../../api/user-function";
import AddressTab from "./AddressTab";
import PersonalTab from "./PersonalTab";
import PasswordPopup from "./PasswordPopup";
import AddressPopup from "./AddressPopup";
import "./ProfileCard.css";

const ProfileCard = () => {
  const queryClient = useQueryClient();
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const [activeTab, setActiveTab] = useState("personal");
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load profile</p>;

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
            <PersonalTab user={user} setShowPasswordPopup={setShowPasswordPopup} />
          )}
          {activeTab === "address" && (
            <AddressTab user={user} setShowAddressPopup={setShowAddressPopup} />
          )}
        </div>
      </div>

      {showPasswordPopup && (
        <PasswordPopup user={user} onClose={() => setShowPasswordPopup(false)} />
      )}

      {showAddressPopup && (
        <AddressPopup user={user} onClose={() => setShowAddressPopup(false)} />
      )}
    </div>
  );
};

export default ProfileCard;