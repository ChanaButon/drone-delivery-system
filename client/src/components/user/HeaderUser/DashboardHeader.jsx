import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../api/user-function";
import "./DashboardHeader.css";

const DashboardHeader = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser
  });

  if (isLoading || !user) return <div>Loading...</div>;

  const firstName = user?.name?.split(" ")[0] || "User";
  const initials = user?.name
  ?.split(" ")
  .map(word => word[0])
  .join("")
  .toUpperCase() || "U";

  

  return (
    <header className="dashboard-header">
      <div>
        <h1>Overview</h1>
        <p>Welcome back, {firstName} 👋</p>
      </div>

      <div className="user-box">
        <div className="avatar">{initials}</div>
      </div>
    </header>
  );
};

export default DashboardHeader;
