import { User, Package, PlusCircle, LogOut } from "lucide-react";
import "./UserSidebar.css";

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          <User size={18} />
          Profile
        </button>

        <button
          className={activeTab === "deliveries" ? "active" : ""}
          onClick={() => setActiveTab("deliveries")}
        >
          <Package size={18} />
          My Deliveries
        </button>

        <button
          className={activeTab === "new" ? "active" : ""}
          onClick={() => setActiveTab("new")}
        >
          <PlusCircle size={18} />
          New Delivery
        </button>
      </nav>

      <button className="logout-btn">
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
