// src/components/Layout.jsx
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import "./Layout.css";

export default function Layout({ onLogout }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="app-layout">
      {/* Header */}
      <header className="main-header">
        <div className="header-left">
          <h1 className="app-title">Travel Planner</h1>
        </div>
        <div className="header-right">
          <button 
            className="header-btn"
            onClick={() => navigate("/create-trip")}
          >
            Create Trip
          </button>
          <button 
            className="header-btn"
            onClick={() => navigate("/history")}
          >
            Trip History
          </button>
          <div 
            className="profile-icon"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            👤
          </div>
        </div>
      </header>

      {/* Profile Sidebar */}
      <ProfileSidebar 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onLogout={onLogout}
      />

      {/* Page Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Overlay for sidebar */}
      {isProfileOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </div>
  );
}