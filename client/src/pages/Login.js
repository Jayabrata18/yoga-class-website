import React, { useState } from "react";
import axios from "axios";
import './login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [userSlot, setUserSlot] = useState("");
  axios.defaults.withCredentials = true;

  const timeSlotMapper = (slot) => {
    switch (slot) {
      case 0:
        return "6-7am slot";
      case 1:
        return "7-8am slot";
      case 2:
        return "8-9am slot";
      case 3:
        return "5-6pm slot";
      default:
        return "";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://yoga-class-website-ten.vercel.app/api/users/signin",
        // "http://localhost:5000/api/users/signin",
        { email, password }
      );

      const { success, slot } = response.data;

      if (success) {
        setLoginMessage("Login successful!");
        setUserSlot(
          `You have registered for the ${timeSlotMapper(slot)} slot.\nYou can only change your slot in the next billing month.`
        );
      } else {
        setLoginMessage("Invalid email or password.");
      }
    } catch (error) {
      console.log("Error:", error);
      setLoginMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button"type="submit">Login</button>
      </form>
      {loginMessage && <p>{loginMessage}</p>}
      {userSlot && <p>{userSlot}</p>}
    </div>
  );
};

export default Login;
