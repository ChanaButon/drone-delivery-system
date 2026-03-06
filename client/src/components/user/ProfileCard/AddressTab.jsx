import React from "react";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import "./ProfileCard.css";

const AddressTab = ({ user, setShowAddressPopup }) => {
  const openAddressPopup = () => setShowAddressPopup(true);

  return (
    <div className="tab-content address-row">
      {user.address ? (
        <>
          <p>
            <strong>Address:</strong> {user.address.city}, {user.address.street} {user.address.number}
          </p>
          <button className="edit-btn" onClick={openAddressPopup}>
            <span>Edit</span>
            <EditSquareIcon fontSize="small" />
          </button>
        </>
      ) : (
        <p>
          <strong>Address:</strong>{" "}
          <span className="add-address" onClick={openAddressPopup}>
            No address yet — Add address
          </span>
        </p>
      )}
    </div>
  );
};

export default AddressTab;