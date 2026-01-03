// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";

export default function Home({ setShowProfile }) {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Top Bar */}
      <div className="top-bar">
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          className="profile-icon"
          alt="Profile"
          onClick={() => setShowProfile(true)}
        />
        <button className="logout-btn" onClick={() => navigate("/")}>
          Login
        </button>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Travel Planner</h1>
        <p className="hero-subtitle">Plan your perfect trip with ease</p>
        
        <div className="hero-buttons">
          <button 
            className="cta-btn primary"
            onClick={() => navigate("/create-trip")}
          >
            ✈️ Create New Trip
          </button>
          <button 
            className="cta-btn secondary"
            onClick={() => navigate("/trip-history")}
          >
            📋 View Trip History
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="features-section">
        <h2>Why Choose Travel Planner?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✈️</div>
            <h3>Easy Trip Planning</h3>
            <p>Create detailed travel itineraries in minutes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Cost Tracking</h3>
            <p>Track expenses and stay within budget</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Group Planning</h3>
            <p>Coordinate with travel buddies easily</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Access your trips from any device</p>
          </div>
        </div>
      </div>
    </div>
  );
}