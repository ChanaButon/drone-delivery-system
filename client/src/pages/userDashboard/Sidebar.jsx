import "./Sidebar.css";

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={activeTab === "deliveries" ? "active" : ""}
          onClick={() => setActiveTab("deliveries")}
        >
          My Deliveries
        </button>
        <button
          className={activeTab === "new" ? "active" : ""}
          onClick={() => setActiveTab("new")}
        >
          New Delivery
        </button>
      </nav>
       <button className="logout-btn">Logout</button>
    </aside>
  );
};

export default Sidebar;
