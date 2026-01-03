import { useState } from "react"; // Add this import
import "../styles/login.css";

export default function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (username.trim() && password.trim()) {
      onLogin(); // Set authentication state
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div className="login-page">
      <div className="main-container">
        {/* Hero Section with Travel Text */}
        <div className="hero-text">
          <span className="script">It's time to</span>
          <h1>TRAVEL</h1>
          <p className="subtitle">
            Discover amazing destinations and create unforgettable memories
          </p>
        </div>

        {/* Glass Card for Signup/Login */}
        <div className="auth-card">
          <div className="glass-card">
            <h2>Create Account</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Username" 
                  className="form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <div className="password-box">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span 
                    className="eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </span>
                </div>
              </div>
              
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="form-input"
                />
              </div>
              
              <a className="forgot">Forgot password?</a>
              
              <button type="submit" className="primary-btn">
                Sign Up
              </button>
            </form>
            
            <div className="divider">
              <span>Or continue with</span>
            </div>
            
            <button className="social google">
              <span className="social-icon">G</span>
              Log in with Google
            </button>
            
            <button className="social facebook">
              <span className="social-icon">f</span>
              Log in with Facebook
            </button>
            
            <p className="login-link">
              Already have an account? <button type="button" className="text-link">Log In</button>
            </p>
            
            <div className="demo-login">
              <p>Demo Credentials:</p>
              <p>Username: <strong>traveler</strong></p>
              <p>Password: <strong>password123</strong></p>
              <button 
                type="button"
                className="demo-btn"
                onClick={() => {
                  setUsername("traveler");
                  setPassword("password123");
                }}
              >
                Fill Demo Credentials
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}