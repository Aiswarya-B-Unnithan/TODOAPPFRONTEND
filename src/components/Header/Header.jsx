import React from "react";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="header">
      <div className="left-content">
        <p className="todo-text">TODO APP</p>
      </div>
      <div className="right-content">
        <button className="logout-button" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}



export default Header;
