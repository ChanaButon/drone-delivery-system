import { useState } from "react";
import Sidebar from "../../components/user/Sidabar/UserSidebar.jsx"
import DashboardHeader from "../../components/user/HeaderUser/DashboardHeader.jsx";
import MyDeliveries from "../../components/user/PackageList/PackageList.jsx";
import Profile from "../../components/user/ProfileCard/ProfileCard.jsx";
import NewDelivery from "../../components/user/NewDelivery/NewDelivery.jsx";

import "./Dashboard.css";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTab = () => {
    switch (activeTab) {
      case "deliveries":
        return <MyDeliveries />;
      case "profile":
        return <Profile />;
      case "new":
        return <NewDelivery />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="dashboard-main">
        <DashboardHeader />
        {renderTab()}
      </main>
    </div>
  );
};

export default DashboardPage;
