import "./ProfileCard.css";

const ProfileCard = () => {
  return (
    <div className="profile">
      <h2>My Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> Chana Cohen</p>
        <p><strong>Email:</strong> chana@example.com</p>
        <p><strong>Phone:</strong> +972 50 123 4567</p>
        <p><strong>Address:</strong> Rothschild 42, Tel Aviv</p>
      </div>
    </div>
  );
};

export default ProfileCard;
