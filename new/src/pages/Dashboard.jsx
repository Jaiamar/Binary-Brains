import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard({ onLogout }) {
  const navigate = useNavigate();
  
  // State for trips data
  const [trips, setTrips] = useState([]);
  const [recentTrips, setRecentTrips] = useState([
    { id: 1, name: "Beach Getaway - Pondicherry", travelers: 5, cost: "6000", date: "Dec 15, 2025" },
    { id: 2, name: "Mountain Trek - Ooty", travelers: 3, cost: "3600", date: "Nov 22, 2025" },
    { id: 3, name: "Temple Tour - Madurai", travelers: 6, cost: "7200", date: "Oct 10, 2025" }
  ]);
  
  // Trip form state
  const [tripName, setTripName] = useState("");
  const [travelerCount, setTravelerCount] = useState(4);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  
  // Editable trip details state
  const [tripDetails, setTripDetails] = useState({
    location: "Salem",
    departure: "2026-01-03",
    timeSlot: "Morning",
    cost: "1200"
  });

  // Available destinations with description and price
  const [availableDestinations] = useState([
    { id: 1, name: "Yercaud", description: "Hill station with coffee plantations", basePrice: 800 },
    { id: 2, name: "Mettur Dam", description: "Large dam and picnic spot", basePrice: 400 },
    { id: 3, name: "ISKON Temple", description: "Spiritual temple with beautiful architecture", basePrice: 300 },
    { id: 4, name: "Sidhar Temple", description: "Ancient temple with historical significance", basePrice: 200 },
    { id: 5, name: "Shevaroy Hills", description: "Mountain range with trekking trails", basePrice: 600 },
    { id: 6, name: "Kiliyur Falls", description: "Beautiful waterfall in Yercaud", basePrice: 500 }
  ]);

  // Handle trip details change
  const handleTripDetailsChange = (e) => {
    setTripDetails({
      ...tripDetails,
      [e.target.name]: e.target.value
    });
  };

  // Toggle destination selection
  const toggleDestination = (destination) => {
    setSelectedDestinations(prev => {
      if (prev.some(d => d.id === destination.id)) {
        // Remove if already selected
        return prev.filter(d => d.id !== destination.id);
      } else {
        // Add if not selected
        return [...prev, { ...destination, selected: true }];
      }
    });
  };

  // Calculate total cost
  const calculateTotalCost = () => {
    const baseCost = parseInt(tripDetails.cost) || 0;
    const destinationsCost = selectedDestinations.reduce((sum, dest) => sum + (dest.basePrice || 0), 0);
    return (baseCost + destinationsCost) * travelerCount;
  };

  // Calculate destinations cost
  const calculateDestinationsCost = () => {
    return selectedDestinations.reduce((sum, dest) => sum + (dest.basePrice || 0), 0);
  };

  // Save trip
  const saveTrip = () => {
    if (!tripName.trim()) {
      alert("Please enter a trip name");
      return;
    }

    const newTrip = {
      id: Date.now(),
      name: tripName,
      travelers: travelerCount,
      cost: calculateTotalCost(),
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      details: { ...tripDetails },
      destinations: [...selectedDestinations],
      createdAt: new Date().toISOString()
    };

    // Add to trips list
    setTrips(prev => [newTrip, ...prev]);
    
    // Update recent trips (keep only latest 3)
    setRecentTrips(prev => [
      { 
        id: newTrip.id, 
        name: newTrip.name, 
        travelers: newTrip.travelers, 
        cost: newTrip.cost, 
        date: newTrip.date 
      },
      ...prev.slice(0, 2)
    ]);

    // Show success message
    alert(`✅ Trip "${tripName}" saved successfully!\n\n📊 Summary:\n• Travelers: ${travelerCount}\n• Destinations: ${selectedDestinations.length}\n• Total Cost: ₹${calculateTotalCost()}/-`);

    // Reset form
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setTripName("");
    setTravelerCount(4);
    setSelectedDestinations([]);
    setTripDetails({
      location: "Salem",
      departure: "2026-01-03",
      timeSlot: "Morning",
      cost: "1200"
    });
  };

  // Load initial data
  useEffect(() => {
    // You can load from localStorage or API here
    const savedTrips = JSON.parse(localStorage.getItem('savedTrips') || '[]');
    if (savedTrips.length > 0) {
      setTrips(savedTrips);
    }
  }, []);

  // Save trips to localStorage
  useEffect(() => {
    localStorage.setItem('savedTrips', JSON.stringify(trips));
  }, [trips]);

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="header">
        <h1>Creating Trip</h1>
        <div className="header-actions">
          <div className="profile-icon" title="User Profile">👤</div>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="content">
        {/* Left Panel */}
        <div className="left-panel">
          {/* Trip Name */}
          <div className="input-group">
            <span className="label">Enter Trip Name</span>
            <input 
              type="text" 
              placeholder="Enter the trip name (e.g., Salem Adventure)" 
              className="trip-name-input"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
            />
          </div>

          {/* Trip Details - EDITABLE */}
          <div className="card">
            <span className="card-title">Trip Details</span>
            <div className="trip-details-editable">
              <div className="detail-item-editable">
                <label className="detail-label-editable">Location</label>
                <input
                  type="text"
                  name="location"
                  value={tripDetails.location}
                  onChange={handleTripDetailsChange}
                  className="detail-input-editable"
                  placeholder="Enter location"
                />
              </div>
              
              <div className="detail-item-editable">
                <label className="detail-label-editable">Departure</label>
                <input
                  type="date"
                  name="departure"
                  value={tripDetails.departure}
                  onChange={handleTripDetailsChange}
                  className="detail-input-editable"
                />
              </div>
              
              <div className="detail-item-editable">
                <label className="detail-label-editable">Time Slot</label>
                <select
                  name="timeSlot"
                  value={tripDetails.timeSlot}
                  onChange={handleTripDetailsChange}
                  className="detail-select-editable"
                >
                  <option value="Morning">Morning (6:00 AM - 12:00 PM)</option>
                  <option value="Afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
                  <option value="Evening">Evening (5:00 PM - 9:00 PM)</option>
                  <option value="Night">Night (9:00 PM - 6:00 AM)</option>
                </select>
              </div>
              
              <div className="detail-item-editable">
                <label className="detail-label-editable">Base Cost per Person (₹)</label>
                <div className="cost-input-wrapper">
                  <span className="currency-symbol">₹</span>
                  <input
                    type="number"
                    name="cost"
                    value={tripDetails.cost}
                    onChange={handleTripDetailsChange}
                    className="detail-input-editable cost-input"
                    min="100"
                    step="100"
                  />
                </div>
              </div>
            </div>
            
            {/* Cost Breakdown */}
            <div className="cost-breakdown">
              <div className="breakdown-item">
                <span className="breakdown-label">Base Cost ({travelerCount} travelers):</span>
                <span className="breakdown-value">₹{travelerCount * parseInt(tripDetails.cost)}</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Destinations Cost:</span>
                <span className="breakdown-value">₹{calculateDestinationsCost() * travelerCount}</span>
              </div>
              <div className="breakdown-total">
                <span className="total-label">Total Trip Cost:</span>
                <span className="total-amount">₹{calculateTotalCost()}/-</span>
              </div>
            </div>
          </div>

          {/* Destination Selection - INTERACTIVE */}
          <div className="card">
            <span className="card-title">Available Destinations</span>
            <div className="destination-list">
              {availableDestinations.map(destination => {
                const isSelected = selectedDestinations.some(d => d.id === destination.id);
                return (
                  <div 
                    key={destination.id} 
                    className={`destination-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleDestination(destination)}
                  >
                    <div className="destination-info">
                      <div className="destination-header">
                        <h4 className="destination-name">{destination.name}</h4>
                        <span className="destination-price">₹{destination.basePrice}/person</span>
                      </div>
                      <p className="destination-description">{destination.description}</p>
                    </div>
                    <div className="destination-action">
                      <button 
                        className={`destination-btn ${isSelected ? 'remove' : 'add'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDestination(destination);
                        }}
                      >
                        {isSelected ? '✓ Added' : '+ Add'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Selected Destinations Summary */}
            {selectedDestinations.length > 0 && (
              <div className="selected-destinations-summary">
                <h4>Selected Destinations ({selectedDestinations.length}):</h4>
                <div className="selected-destinations-list">
                  {selectedDestinations.map(destination => (
                    <div key={destination.id} className="selected-destination-item">
                      <span className="selected-destination-name">{destination.name}</span>
                      <span className="selected-destination-price">₹{destination.basePrice}</span>
                      <button 
                        className="remove-destination-btn"
                        onClick={() => toggleDestination(destination)}
                        title="Remove destination"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="destinations-total">
                  <span>Destinations Total:</span>
                  <span className="destinations-total-price">₹{calculateDestinationsCost() * travelerCount}</span>
                </div>
              </div>
            )}
          </div>

          {/* Travelers Section - INTERACTIVE */}
          <div className="card">
            <span className="card-title">Travelers</span>
            <div className="travelers-container">
              <div className="traveler-count-control">
                <span className="count-label">Number of Travelers</span>
                <div className="count-control-wrapper">
                  <button 
                    className="count-btn decrease"
                    onClick={() => setTravelerCount(prev => Math.max(1, prev - 1))}
                    disabled={travelerCount <= 1}
                  >
                    −
                  </button>
                  <div className="count-display">
                    <span className="count-number">{travelerCount}</span>
                    <span className="count-unit">travelers</span>
                  </div>
                  <button 
                    className="count-btn increase"
                    onClick={() => setTravelerCount(prev => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="traveler-cost-info">
                <div className="cost-per-traveler">
                  <span className="cost-label">Cost per traveler:</span>
                  <span className="cost-value">₹{parseInt(tripDetails.cost) + calculateDestinationsCost()}</span>
                </div>
                <div className="cost-breakdown-traveler">
                  <small>Base: ₹{tripDetails.cost} + Destinations: ₹{calculateDestinationsCost()}</small>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="secondary-btn" onClick={resetForm}>
              Clear All
            </button>
            <button className="primary-action-btn" onClick={saveTrip}>
              Save Trip
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          {/* Recent Trips - VISIBLE TEXT */}
          <div className="history-card">
            <h2 className="recent-trips-title">Your Recent Trips</h2>
            <div className="recent-trips-list">
              {recentTrips.map(trip => (
                <div key={trip.id} className="recent-trip-item">
                  <div className="recent-trip-header">
                    <h4 className="recent-trip-name">{trip.name}</h4>
                    <span className="recent-trip-cost">₹{trip.cost}</span>
                  </div>
                  <div className="recent-trip-details">
                    <span className="recent-trip-travelers">👥 {trip.travelers} travelers</span>
                    <span className="recent-trip-date">📅 {trip.date}</span>
                  </div>
                  <div className="recent-trip-actions">
                    <button className="recent-trip-action-btn view">View Details</button>
                    <button className="recent-trip-action-btn repeat">Repeat Trip</button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="view-all-btn"
              onClick={() => navigate("/history")}
            >
              View All Trips →
            </button>
          </div>

          {/* Trip Summary */}
          <div className="stats-card">
            <h2 className="summary-title">Trip Summary</h2>
            <div className="summary-grid">
              <div className="summary-item">
                <div className="summary-icon">👥</div>
                <div className="summary-content">
                  <div className="summary-value">{travelerCount}</div>
                  <div className="summary-label">Travelers</div>
                </div>
              </div>
              <div className="summary-item">
                <div className="summary-icon">📍</div>
                <div className="summary-content">
                  <div className="summary-value">{selectedDestinations.length}</div>
                  <div className="summary-label">Destinations</div>
                </div>
              </div>
              <div className="summary-item">
                <div className="summary-icon">💰</div>
                <div className="summary-content">
                  <div className="summary-value">₹{parseInt(tripDetails.cost) + calculateDestinationsCost()}</div>
                  <div className="summary-label">Per Person</div>
                </div>
              </div>
              <div className="summary-item highlight">
                <div className="summary-icon">💳</div>
                <div className="summary-content">
                  <div className="summary-value total-cost">₹{calculateTotalCost()}</div>
                  <div className="summary-label">Total Cost</div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="activity-card">
            <h2 className="activity-title">Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">📝</div>
                <div className="activity-content">
                  <p className="activity-text">Trip name updated</p>
                  <small className="activity-time">Just now</small>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">👥</div>
                <div className="activity-content">
                  <p className="activity-text">{travelerCount} travelers selected</p>
                  <small className="activity-time">Just now</small>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">📍</div>
                <div className="activity-content">
                  <p className="activity-text">{selectedDestinations.length} destinations added</p>
                  <small className="activity-time">Just now</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}