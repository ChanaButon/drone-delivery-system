import { useState } from "react";
import AdminSidebar from "../../components/admin/Sidebar/AdminSidebar.jsx";
import AdminHeader from "../../components/admin/Header/AdminHeader.jsx";

import DroneTable from "../../components/admin/Drones/DroneTable.jsx";
import StationTable from "../../components/admin/Stations/StationTable.jsx";
import PackageTable from "../../components/admin/Packages/PackageTable.jsx";
import UsersTable from "../../components/admin/Users/UsersTable.jsx";

import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("drones");

  const renderContent = () => {
    switch (activeTab) {
      case "drones":
        return <DroneTable />;
      case "stations":
        return <StationTable />;
      case "packages":
        return <PackageTable />;
      case "users":
        return <UsersTable />;
      default:
        return <DroneTable />;
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="admin-main">
        <AdminHeader activeTab={activeTab} />
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
