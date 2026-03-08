import { Database, Users, Package, Drone, Navigation,LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../../api/auth-function";
import "./AdminSidebar.css";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
  try {
    await logoutUser();
    queryClient.setQueryData(["currentUser"], null);
      queryClient.invalidateQueries(["currentUser"]);
    navigate("/");
  } catch (err) {
    console.error(err);
  }
};
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

       <button className="logout-btn" onClick={handleLogout}>
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
