import "./AdminHeader.css";

const titles = {
  drones: "Fleet Control",
  stations: "Stations Network",
  packages: "Global Packages",
  users: "User Management",
};

const AdminHeader = ({ activeTab }) => {
  return (
    <header className="admin-header">
      <div>
        <h1>{titles[activeTab]}</h1>
        <p>System administration overview</p>
      </div>
    </header>
  );
};

export default AdminHeader;
