import { useState } from "react";
import "../styles/Profile.css";

export default function Profile() {
  const [user, setUser] = useState({
    name: "John Traveler",
    email: "john@example.com",
    phone: "+91 9876543210",
    bio: "Travel enthusiast exploring amazing destinations",
    location: "Chennai, India",
    joinedDate: "January 2024"
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  const stats = [
    { label: "Total Trips", value: "12" },
    { label: "Destinations", value: "24" },
    { label: "Travel Buddies", value: "48" },
    { label: "Trip Days", value: "156" }
  ];

  return (
    <div className="profile-page">
      <h1 className="profile-title">My Profile</h1>
      
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="avatar-section">
            <div className="avatar">👤</div>
            <button className="change-photo-btn">Change Photo</button>
          </div>
          
          <div className="profile-actions">
            {!isEditing ? (
              <button 
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <>
                <button 
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button 
                  className="save-btn"
                  onClick={saveProfile}
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="profile-info">
          <div className="input-group">
            <label>Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            ) : (
              <p className="info-value">{user.name}</p>
            )}
          </div>

          <div className="input-group">
            <label>Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            ) : (
              <p className="info-value">{user.email}</p>
            )}
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            ) : (
              <p className="info-value">{user.phone}</p>
            )}
          </div>

          <div className="input-group">
            <label>Location</label>
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={user.location}
                onChange={handleChange}
                placeholder="Enter your location"
              />
            ) : (
              <p className="info-value">{user.location}</p>
            )}
          </div>

          <div className="input-group">
            <label>Bio</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                rows="3"
              />
            ) : (
              <p className="info-value">{user.bio}</p>
            )}
          </div>

          {!isEditing && (
            <div className="input-group">
              <label>Member Since</label>
              <p className="info-value">{user.joinedDate}</p>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <h2>Travel Stats</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}