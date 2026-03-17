import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../../api/auth-function";
import { showSuccess, showError } from "../../../utils/popup";
import "./ProfileCard.css";

const PasswordPopup = ({ user, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      showSuccess("Password updated successfully");
      onClose();
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (err) => showError(err.message),
  });

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showError("Passwords do not match");
      return;
    }
    mutation.mutate({ oldPassword, newPassword });
  };

  return (
    <div className="password-popup">
      <div className="password-popup-card">
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordUpdate}>
          <input
            type="password"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="popup-buttons">
            <button
              className="button-submit"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Updating..." : "Update Password"}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordPopup;