import { useState } from "react";
import "../styles/Settings.css";

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    currency: "INR",
    language: "English",
    theme: "light",
    autoSave: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const saveSettings = () => {
    localStorage.setItem("userSettings", JSON.stringify(settings));
    alert("Settings saved successfully!");
  };

  return (
    <div className="settings-page">
      <h1 className="settings-title">Settings</h1>
      
      <div className="settings-container">
        {/* Notifications */}
        <div className="settings-section">
          <h2>Notifications</h2>
          <div className="settings-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
              />
              <span>Email Notifications</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="smsNotifications"
                checked={settings.smsNotifications}
                onChange={handleChange}
              />
              <span>SMS Notifications</span>
            </label>
          </div>
        </div>

        {/* Preferences */}
        <div className="settings-section">
          <h2>Preferences</h2>
          <div className="settings-group">
            <div className="input-group">
              <label>Currency</label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>
            
            <div className="input-group">
              <label>Language</label>
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
              </select>
            </div>
            
            <div className="input-group">
              <label>Theme</label>
              <select
                name="theme"
                value={settings.theme}
                onChange={handleChange}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Trip Settings */}
        <div className="settings-section">
          <h2>Trip Settings</h2>
          <div className="settings-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="autoSave"
                checked={settings.autoSave}
                onChange={handleChange}
              />
              <span>Auto-save trips</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="settings-actions">
          <button className="secondary-btn" onClick={() => setSettings({
            emailNotifications: true,
            smsNotifications: false,
            currency: "INR",
            language: "English",
            theme: "light",
            autoSave: true
          })}>
            Reset to Default
          </button>
          <button className="primary-btn" onClick={saveSettings}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}