import "./ProfileCard.css";

const ProfileCard = () => {
  return (
    <div className="profile">
      <h2>My Profile</h2>
      <div className="profile-card">
        {}
        <div className="avatar">CC</div>

        {}
        <div className="profile-info">
          <h3>Chana Cohen</h3>
          <p><strong>Email:</strong> chana@example.com</p>
          <p><strong>Phone:</strong> +972 50 123 4567</p>
          <p><strong>Address:</strong> Rothschild 42, Tel Aviv</p>

          {}
        </div>

        {}
        <div className="profile-actions">
          <button className="edit-btn">Edit Password</button>
          <button className="edit-btn">Edit Address</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
