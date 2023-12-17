import React from "react";
import Navbar from "../Components/Navbar";
import mainPhoto from "../assets/main.png";
import "./homepage.css";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    // Navigate to the Registration page
    navigate("/registration");
  };
  return (
    <div>
      <Navbar />
      <div className="hero-section">
        <div className="main-content-left ">
          <img src={mainPhoto} alt="Main Photo" className="main-photo" />
        </div>
        <div className="main-content-right ">
          <h1>Welcome to Our Website!</h1>
          <h1>Tranformation to self and nature with Yoga</h1>
          <p>
            Explore our amazing courses and content. Join us on a journey of
            learning and practicing.{" "}
          </p>
          <button onClick={handleSignupClick}>Signup to join classes</button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
