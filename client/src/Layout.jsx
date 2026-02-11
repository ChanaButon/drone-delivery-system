import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen font-sans text-left" dir="ltr">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
