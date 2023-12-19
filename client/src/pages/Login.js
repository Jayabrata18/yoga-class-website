import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [userSlot, setUserSlot] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signin",
        { email, password }
      );

      const { success, message, slot } = response.data;

      if (success) {
        setLoginMessage("Login successful!");
        setUserSlot(`You are registered for the ${slot} slot.`);
      } else {
        setLoginMessage("Invalid email or password.");
      }
    } catch (error) {
      console.log("Error:", error);
      setLoginMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {loginMessage && <p>{loginMessage}</p>}
      {userSlot && <p>{userSlot}</p>}
    </div>
  );
};

export default Login;
