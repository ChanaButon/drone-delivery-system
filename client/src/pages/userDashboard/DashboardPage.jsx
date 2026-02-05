import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import DashboardHeader from "./DashboardHeader.jsx";
import Overview from "../../components/OverviewCards/OverviewCards.jsx";
import MyDeliveries from "../../components/PackageList/PackageList.jsx";
import Profile from "../../components/ProfileCard/ProfileCard.jsx";
import NewDelivery from "../../components/NewDelivery/NewDelivery.jsx";

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
