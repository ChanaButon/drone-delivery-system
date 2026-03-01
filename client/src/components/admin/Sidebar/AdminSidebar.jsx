import { Database, Users, Package, Drone, Navigation } from "lucide-react";
import "./AdminSidebar.css";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <Database size={22} />
        <span>Admin Panel</span>
      </div>

      <nav className="admin-nav">
       <button
          onClick={() => setActiveTab("drones")}
          className={activeTab === "drones" ? "active" : ""}
        >
          <Drone size={18} /> 
          Drones Management
        </button>

        <button
          onClick={() => setActiveTab("stations")}
          className={activeTab === "stations" ? "active" : ""}
        >
          <Database size={18} />
          Drone Stations
        </button>

        <button
          onClick={() => setActiveTab("packages")}
          className={activeTab === "packages" ? "active" : ""}
        >
          <Package size={18} />
          Packages
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={activeTab === "users" ? "active" : ""}
        >
          <Users size={18} />
          Users
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
