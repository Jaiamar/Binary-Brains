// src/pages/CreateTrip.jsx
import { useState } from "react";

export default function CreateTrip({ setShowProfile }) {
  const [tripName, setTripName] = useState("");
  const [location, setLocation] = useState("Salem");
  const [departure, setDeparture] = useState("2026-01-03");
  const [returnDate, setReturnDate] = useState("2026-01-09");
  const [travelers, setTravelers] = useState(4);
  const [costPerPerson, setCostPerPerson] = useState(1200);

  const totalCost = travelers * costPerPerson;

  const saveTrip = () => {
    if (!tripName.trim()) {
      alert("Please enter a trip name");
      return;
    }

    const tripData = {
      id: Date.now(),
      name: tripName,
      location,
      departure,
      returnDate,
      travelers,
      costPerPerson,
      totalCost,
      date: new Date().toLocaleDateString()
    };

    // Save to localStorage
    const savedTrips = JSON.parse(localStorage.getItem('savedTrips') || '[]');
    savedTrips.unshift(tripData);
    localStorage.setItem('savedTrips', JSON.stringify(savedTrips));

    alert(`Trip "${tripName}" saved successfully!\n\nTotal Cost: ₹${totalCost}`);
    
    // Reset form
    setTripName("");
    setLocation("Salem");
    setDeparture("2026-01-03");
    setReturnDate("2026-01-09");
    setTravelers(4);
    setCostPerPerson(1200);
  };

  return (
    <div className="create-trip-page">
      {/* Top Bar */}
      <div className="top-bar">
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          className="profile-icon"
          alt="Profile"
          onClick={() => setShowProfile(true)}
        />
        <button className="logout-btn">Logout</button>
      </div>

      <div className="trip-layout">
        {/* LEFT SECTION */}
        <div className="left-panel">
          {/* Trip Name */}
          <label className="section-label">Enter Trip Name</label>
          <input
            className="trip-name-input"
            placeholder="Enter the trip Name"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
          />

          {/* Trip Details */}
          <div className="info-row">
            <div className="info-box">
              <span>Departure</span>
              <input
                type="date"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              />
            </div>

            <div className="info-box">
              <span>Return</span>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={departure}
              />
            </div>

            <div className="info-box large">
              <span>Location</span>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
              />
            </div>

            <div className="info-box">
              <span>Travelers</span>
              <div className="traveler-control">
                <button 
                  className="traveler-btn"
                  onClick={() => setTravelers(prev => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span className="traveler-count">{travelers}</span>
                <button 
                  className="traveler-btn"
                  onClick={() => setTravelers(prev => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Available Destinations */}
          <label className="section-label">Available Destinations</label>
          <div className="destination-box">
            {["Yercaud", "Mettur Dam", "ISKON Temple", "Sidhar Temple"].map(
              (place) => (
                <div key={place} className="destination-row">
                  <span>{place}</span>
                  <button className="add-btn">Add</button>
                </div>
              )
            )}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="clear-btn" onClick={() => {
              setTripName("");
              setLocation("Salem");
              setDeparture("2026-01-03");
              setReturnDate("2026-01-09");
              setTravelers(4);
              setCostPerPerson(1200);
            }}>
              Clear All
            </button>
            <button className="save-btn" onClick={saveTrip}>
              Save Trip
            </button>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="right-panel">
          <button className="review-btn">Trip Review</button>

          <div className="review-box">
            <div className="review-row">
              <span>Yercaud (Salem)</span>
              <span>7 Jan 2026</span>
              <span>₹{travelers * 800}</span>
            </div>
            <div className="review-row">
              <span>Temple (Salem)</span>
              <span>7 Jan 2026</span>
              <span>₹{travelers * 300}</span>
            </div>
            <div className="review-row">
              <span>Beach (Cochin)</span>
              <span>8 Jan 2026</span>
              <span>₹{travelers * 1200}</span>
            </div>
            
            {/* Total Cost */}
            <div className="review-total">
              <span>Total Cost</span>
              <span className="total-amount">₹{totalCost}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}