// src/components/ProfileSidebar.jsx
import { useNavigate } from "react-router-dom";
import "./ProfileSidebar.css";

export default function ProfileSidebar({ show, setShow }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setShow(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setShow(false);
    navigate("/");
  };

  return (
    <div className={`sidebar ${show ? "open" : ""}`}>
      <div className="sidebar-header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          className="sidebar-profile"
          alt="Profile"
        />
        <h3>John Traveler</h3>
        <p>john@example.com</p>
      </div>

      <ul>
        <li onClick={() => handleNavigation("/")}>🏠 Home Page</li>
        <li onClick={() => handleNavigation("/create-trip")}>✈️ Create Trip</li>
        <li onClick={() => handleNavigation("/trip-history")}>📋 Trip History</li>
        <li>⚙️ Settings</li>
      </ul>

      <button className="sidebar-logout" onClick={handleLogout}>
        🚪 Log Out
      </button>

      <span className="close-btn" onClick={() => setShow(false)}>×</span>
    </div>
  );
}