// src/pages/TripHistory.jsx
import { useNavigate } from "react-router-dom";

export default function TripHistory({ setShowProfile }) {
  const navigate = useNavigate();
  
  const tripHistory = [
    { id: 1, place: "Beach getaway – Pondicherry", price: "₹6,000", date: "Dec 15, 2025" },
    { id: 2, place: "Mountain Trek – Ooty", price: "₹4,800", date: "Nov 22, 2025" },
    { id: 3, place: "Temple Tour – Madurai", price: "₹7,200", date: "Oct 10, 2025" },
    { id: 4, place: "Wildlife Safari – Mudumalai", price: "₹5,600", date: "Sep 5, 2025" },
    { id: 5, place: "Hill Station – Yercaud", price: "₹4,200", date: "Aug 18, 2025" },
    { id: 6, place: "Dam Visit – Mettur", price: "₹3,600", date: "Jul 12, 2025" }
  ];

  return (
    <div className="trip-history-page">
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

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/create-trip")}>
        ← Back to Create Trip
      </button>

      <h1 className="history-title">Your Trip History</h1>

      <div className="history-card">
        <div className="history-header">
          <span>Place</span>
          <span>Price</span>
          <span>Date</span>
        </div>

        {tripHistory.map((trip) => (
          <div className="history-row" key={trip.id}>
            <span>{trip.place}</span>
            <span>{trip.price}</span>
            <span>{trip.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}