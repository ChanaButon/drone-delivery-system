import { Database, Users, Package, Navigation } from "lucide-react";
import "./AdminSidebar.css";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <Database size={22} />
        <span>Admin Panel</span>
      </div>

      <nav>
        <button onClick={() => setActiveTab("drones")} className={activeTab === "drones" ? "active" : ""}>
          Fleet Management
        </button>
        <button onClick={() => setActiveTab("stations")} className={activeTab === "stations" ? "active" : ""}>
          Drone Stations
        </button>
        <button onClick={() => setActiveTab("packages")} className={activeTab === "packages" ? "active" : ""}>
          Packages
        </button>
        <button onClick={() => setActiveTab("users")} className={activeTab === "users" ? "active" : ""}>
          Users
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
