import "./DashboardHeader.css";

const DashboardHeader = () => {
  return (
    <header className="dashboard-header">
      <div>
        <h1>Overview</h1>
        <p>Welcome back, Chana 👋</p>
      </div>

      <div className="user-box">
        <div className="avatar">CC</div>
      </div>
    </header>
  );
};

export default DashboardHeader;
