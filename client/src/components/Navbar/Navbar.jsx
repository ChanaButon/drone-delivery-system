import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../api/user-function";
import { logoutUser } from "../../api/auth-function";
import droneImg from '../../assets/drone.png';
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5
  });


 const handleLogoClick = async () => {
  if (user) {
    try {
      await logoutUser();
      queryClient.setQueryData(["currentUser"], null);
      queryClient.invalidateQueries(["currentUser"]);
    } catch (err) {
      console.error(err);
    }
  }
  navigate("/");
};

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img
            src={droneImg}
            onClick={ handleLogoClick}
            alt="Drone delivery"
            className="nav-image"
               />
           <span className="logo-black">Dro</span>
           <span className="logo-blue">nix</span>
        </div>
        <div className="navbar-links">
          <a href="#">Nice to meet you</a>
          <a href="#">how it works</a>
          <a href="#">price list</a>
          <a href="#">Contact us</a>
          <a href="#">Support</a>
        </div>
        <div className="navbar-actions">
          {!user && (
            <>
              <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
              <button className="join-btn" onClick={() => navigate("/register")}>I'll start here</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
