import React from "react";
import "./navbar.css";
import logo from "../assets/logo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";


const Navbar = () => {
  const buttonNames = ["Home", "About", "Classes", "Practicing", "Content"];
  return (
    <div className="navbar-container">
      <div className="logo">
        <img src={logo} alt="logo" className="logo-img" />
      </div>
      <div className="navbar-buttons">
        <button className="btn-primary">Home</button>
        <button className="btn-primary">About</button>
        <button className="btn-primary">Classes</button>
        <button className="btn-primary">Practicing</button>
        <button className="btn-primary">Content</button>
      </div>
      <div className="navbar-userIcon">
        <FontAwesomeIcon icon={faUser} className="user-icon" />
      </div>
    </div>
  );
};

export default Navbar;
