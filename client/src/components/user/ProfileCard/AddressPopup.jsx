import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAddress } from "../../../api/user-function";
import "./ProfileCard.css";

const AddressPopup = ({ user, onClose }) => {
  const queryClient = useQueryClient();
  const [city, setCity] = useState(user.address?.city || "");
  const [street, setStreet] = useState(user.address?.street || "");
  const [number, setNumber] = useState(user.address?.number || "");

  const addressMutation = useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      alert("Address saved");
      onClose();
    },
    onError: (err) => alert(err.message),
  });

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    addressMutation.mutate({ city, street, number });
  };

  return (
    <div className="password-popup">
      <div className="password-popup-card">
        <h2>{user.address ? "Update Address" : "Add Address"}</h2>
        <form onSubmit={handleAddressSubmit}>
          <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <input placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} />
          <input type="number" placeholder="House Number" value={number} onChange={(e) => setNumber(e.target.value)} />

          <div className="popup-buttons">
            <button className="button-submit" type="submit" disabled={addressMutation.isPending}>
              {addressMutation.isPending ? "Saving..." : "Save Address"}
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

export default AddressPopup;