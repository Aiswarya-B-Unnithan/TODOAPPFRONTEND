import axios from "axios";
import React, { useState } from "react";
import { baseURL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://todoappbackend-3och.onrender.com/login",
        {
          email,
          password,
        }
      );
      console.log(response);
      localStorage.setItem("userId", response.data?.user?._id);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <link to="/register">
          <button>Register</button>
        </link>
      </form>
    </div>
  );
};

export default LoginForm;
