import React, { useState } from "react";
import { baseURL } from "../utils/constant";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"
import { validateEmail, validatePassword } from "../utils/formValidator"; 

const RegistrationForm = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Paswords dont match");
    }
    // Validate email
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 6 characters long and contain only letters, numbers, or special characters."
      );
      return;
    }

    try {
      const response = await axios.post(
        "https://todoappbackend-3och.onrender.com/register",
        {
          name,
          email,
          password,
        }
      );
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="registration-form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email</label>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Register</button>

        <Link to='/login'>
          <button style={{marginLeft:'15px'}}>Login</button>
        </Link>
      </form>
    </div>
  );
};

export default RegistrationForm;
