import { User, Package, PlusCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../../api/auth-function";
import "./UserSidebar.css";


const Sidebar = ({ activeTab, setActiveTab }) => {

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

      <button className="logout-btn" onClick={handleLogout}>
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
