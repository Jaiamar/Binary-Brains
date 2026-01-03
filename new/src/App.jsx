import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Profile Sidebar Component
function ProfileSidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  
  if (!isOpen) return null
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '300px',
      height: '100vh',
      background: '#0f3d3e',
      color: 'white',
      padding: '30px',
      zIndex: 1000,
      boxShadow: '-5px 0 15px rgba(0,0,0,0.2)'
    }}>
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer'
        }}
      >
        ×
      </button>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: '#e0b15c',
          borderRadius: '50%',
          margin: '0 auto 15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px'
        }}>
          👤
        </div>
        <h3 style={{ margin: '0 0 5px 0' }}>John Traveler</h3>
        <p style={{ margin: 0, opacity: 0.8 }}>john@example.com</p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={() => { navigate('/'); onClose() }}
          style={sidebarButtonStyle}
        >
          🏠 Home Page
        </button>
        <button
          onClick={() => { navigate('/create-trip'); onClose() }}
          style={sidebarButtonStyle}
        >
          ✈️ Create Trip
        </button>
        <button
          onClick={() => { navigate('/trip-history'); onClose() }}
          style={sidebarButtonStyle}
        >
          📋 Trip History
        </button>
        <button
          onClick={() => {
            alert('Settings page coming soon!')
            onClose()
          }}
          style={sidebarButtonStyle}
        >
          ⚙️ Settings
        </button>
        <button
          onClick={() => {
            localStorage.removeItem('isAuthenticated')
            localStorage.removeItem('savedTrips')
            navigate('/')
            onClose()
          }}
          style={{
            ...sidebarButtonStyle,
            background: '#e74c3c',
            marginTop: '20px'
          }}
        >
          🚪 Log Out
        </button>
      </div>
    </div>
  )
}

const sidebarButtonStyle = {
  width: '100%',
  padding: '12px',
  background: 'rgba(255,255,255,0.1)',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  textAlign: 'left',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  transition: 'background 0.3s'
}

// Header Component
function Header({ onProfileClick }) {
  const navigate = useNavigate()
  
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '40px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      zIndex: 100
    }}>
      <div
        onClick={onProfileClick}
        style={{
          width: '45px',
          height: '45px',
          background: '#0f3d3e',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '20px',
          cursor: 'pointer',
          border: '2px solid white',
          transition: 'transform 0.3s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        👤
      </div>
      <button
        onClick={() => {
          localStorage.removeItem('isAuthenticated')
          localStorage.removeItem('savedTrips')
          navigate('/')
        }}
        style={{
          background: '#e74c3c',
          color: 'white',
          padding: '8px 20px',
          borderRadius: '20px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '600',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#c0392b'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#e74c3c'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        Logout
      </button>
    </div>
  )
}

// Home Page
function HomePage({ onProfileClick }) {
  const navigate = useNavigate()
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80) center/cover fixed',
      padding: '40px',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255,255,255,0.9)'
      }}></div>
      
      <Header onProfileClick={onProfileClick} />
      
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', paddingTop: '100px' }}>
        <h1 style={{ 
          fontSize: '48px', 
          color: '#0f3d3e',
          marginBottom: '20px',
          fontWeight: '700'
        }}>
          Welcome to Travel Planner ✈️
        </h1>
        
        <p style={{ 
          fontSize: '20px', 
          color: '#666',
          marginBottom: '40px',
          maxWidth: '600px',
          margin: '0 auto 40px'
        }}>
          Plan your perfect trip with our easy-to-use travel planning tools
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/create-trip')}
            style={buttonStyle('#0f3d3e', 'white')}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#16373c'
              e.currentTarget.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#0f3d3e'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            ✈️ Create New Trip
          </button>
          
          <button
            onClick={() => navigate('/trip-history')}
            style={buttonStyle('#e0b15c', '#0f3d3e')}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#d4a34f'
              e.currentTarget.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#e0b15c'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            📋 View Trip History
          </button>
        </div>
        
        {/* Demo Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          marginTop: '60px',
          flexWrap: 'wrap'
        }}>
          {[
            { icon: '✈️', value: '12', label: 'Trips Planned' },
            { icon: '📍', value: '24', label: 'Destinations' },
            { icon: '👥', value: '48', label: 'Travel Buddies' },
            { icon: '💰', value: '₹48,600', label: 'Total Spent' }
          ].map((stat, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '25px',
              minWidth: '180px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              border: '2px solid #f2b45b'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>{stat.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#0f3d3e' }}>{stat.value}</div>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Create Trip Page
function CreateTripPage({ onProfileClick }) {
  const navigate = useNavigate()
  const [tripName, setTripName] = useState('')
  const [location, setLocation] = useState('Salem')
  const [departure, setDeparture] = useState('2026-01-03')
  const [returnDate, setReturnDate] = useState('2026-01-09')
  const [travelers, setTravelers] = useState(4)
  const [cost, setCost] = useState(1200)
  const [selectedDestinations, setSelectedDestinations] = useState([])
  const [destinations, setDestinations] = useState([
    { id: 1, name: 'Yercaud', price: 800, selected: false },
    { id: 2, name: 'Mettur Dam', price: 400, selected: false },
    { id: 3, name: 'ISKON Temple', price: 300, selected: false },
    { id: 4, name: 'Sidhar Temple', price: 200, selected: false },
    { id: 5, name: 'Shevaroy Hills', price: 600, selected: false },
    { id: 6, name: 'Kiliyur Falls', price: 500, selected: false }
  ])
  
  // Calculate costs
  const baseCost = travelers * cost
  const destinationsCost = selectedDestinations.reduce((sum, dest) => sum + dest.price, 0) * travelers
  const totalCost = baseCost + destinationsCost
  
  // Toggle destination selection
  const toggleDestination = (id) => {
    setDestinations(dests => 
      dests.map(dest => 
        dest.id === id ? { ...dest, selected: !dest.selected } : dest
      )
    )
    
    setSelectedDestinations(prev => {
      const destination = destinations.find(d => d.id === id)
      if (prev.some(d => d.id === id)) {
        return prev.filter(d => d.id !== id)
      } else {
        return [...prev, destination]
      }
    })
  }
  
  // Save trip
  const saveTrip = () => {
    if (!tripName.trim()) {
      alert('Please enter a trip name')
      return
    }
    
    const tripData = {
      id: Date.now(),
      name: tripName,
      location,
      departure,
      returnDate,
      travelers,
      cost,
      selectedDestinations: [...selectedDestinations],
      totalCost,
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    }
    
    // Save to localStorage
    const savedTrips = JSON.parse(localStorage.getItem('savedTrips') || '[]')
    savedTrips.unshift(tripData)
    localStorage.setItem('savedTrips', JSON.stringify(savedTrips))
    
    alert(`✅ Trip "${tripName}" saved successfully!\n\n📍 Location: ${location}\n📅 Dates: ${new Date(departure).toLocaleDateString()} to ${new Date(returnDate).toLocaleDateString()}\n👥 Travelers: ${travelers}\n📍 Destinations: ${selectedDestinations.length}\n💰 Total Cost: ₹${totalCost}`)
    
    // Reset form
    resetForm()
  }
  
  // Reset form
  const resetForm = () => {
    setTripName('')
    setLocation('Salem')
    setDeparture('2026-01-03')
    setReturnDate('2026-01-09')
    setTravelers(4)
    setCost(1200)
    setSelectedDestinations([])
    setDestinations(dests => dests.map(dest => ({ ...dest, selected: false })))
  }
  
  // Update return date when departure changes
  useEffect(() => {
    if (new Date(returnDate) < new Date(departure)) {
      setReturnDate(departure)
    }
  }, [departure])
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80) center/cover fixed',
      padding: '40px',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255,255,255,0.85)'
      }}></div>
      
      <Header onProfileClick={onProfileClick} />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '42px', 
          color: '#0f3d3e',
          marginBottom: '40px',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          Creating Trip
        </h1>
        
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          {/* Left Panel */}
          <div style={{ flex: '2', minWidth: '300px' }}>
            {/* Trip Name */}
            <div style={{ marginBottom: '30px' }}>
              <div style={sectionLabelStyle}>
                Enter Trip Name
              </div>
              <input
                type="text"
                placeholder="Enter the trip name"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                style={tripNameInputStyle}
              />
            </div>
            
            {/* Trip Details */}
            <div style={cardStyle}>
              <div style={sectionLabelStyle}>
                Trip Details
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div>
                  <div style={inputLabelStyle}>Location</div>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={inputStyle}
                    placeholder="Enter location"
                  />
                </div>
                
                <div>
                  <div style={inputLabelStyle}>Departure</div>
                  <input
                    type="date"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                
                <div>
                  <div style={inputLabelStyle}>Return</div>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    style={inputStyle}
                    min={departure}
                  />
                </div>
                
                <div>
                  <div style={inputLabelStyle}>Travelers</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button
                      onClick={() => setTravelers(prev => Math.max(1, prev - 1))}
                      style={counterButtonStyle}
                      disabled={travelers <= 1}
                    >
                      -
                    </button>
                    <span style={counterDisplayStyle}>
                      {travelers}
                    </span>
                    <button
                      onClick={() => setTravelers(prev => prev + 1)}
                      style={counterButtonStyle}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div>
                  <div style={inputLabelStyle}>Cost per Person (₹)</div>
                  <div style={{ position: 'relative' }}>
                    <span style={currencySymbolStyle}>
                      ₹
                    </span>
                    <input
                      type="number"
                      value={cost}
                      onChange={(e) => setCost(Math.max(100, Number(e.target.value)))}
                      style={{ ...inputStyle, paddingLeft: '30px' }}
                      min="100"
                      step="100"
                    />
                  </div>
                </div>
                
                <div>
                  <div style={inputLabelStyle}>Base Cost</div>
                  <div style={costDisplayStyle}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f3d3e' }}>
                      ₹{baseCost}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {travelers} × ₹{cost}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Destinations */}
            <div style={cardStyle}>
              <div style={sectionLabelStyle}>
                Available Destinations
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {destinations.map((destination) => (
                  <div 
                    key={destination.id}
                    onClick={() => toggleDestination(destination.id)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '15px',
                      border: `2px solid ${destination.selected ? '#27ae60' : '#e0e0e0'}`,
                      borderRadius: '10px',
                      background: destination.selected ? 'rgba(39, 174, 96, 0.1)' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      if (!destination.selected) {
                        e.currentTarget.style.borderColor = '#0f3d3e'
                        e.currentTarget.style.transform = 'translateX(5px)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!destination.selected) {
                        e.currentTarget.style.borderColor = '#e0e0e0'
                        e.currentTarget.style.transform = 'translateX(0)'
                      }
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '600', color: '#000', marginBottom: '4px' }}>
                        {destination.name}
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        ₹{destination.price} per person
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleDestination(destination.id)
                      }}
                      style={{
                        background: destination.selected ? '#27ae60' : 'transparent',
                        border: `2px solid ${destination.selected ? '#27ae60' : '#0f3d3e'}`,
                        color: destination.selected ? 'white' : '#0f3d3e',
                        padding: '8px 20px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        minWidth: '100px',
                        transition: 'all 0.3s'
                      }}
                    >
                      {destination.selected ? '✓ Added' : '+ Add'}
                    </button>
                  </div>
                ))}
              </div>
              
              {selectedDestinations.length > 0 && (
                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #eee' }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                    Selected Destinations ({selectedDestinations.length}):
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedDestinations.map(dest => (
                      <div
                        key={dest.id}
                        style={{
                          background: '#0f3d3e',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        {dest.name}
                        <button
                          onClick={() => toggleDestination(dest.id)}
                          style={{
                            background: 'rgba(255,255,255,0.2)',
                            border: 'none',
                            color: 'white',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
              <button
                onClick={resetForm}
                style={actionButtonStyle('#e74c3c', 'transparent', '#e74c3c')}
              >
                Clear All
              </button>
              
              <button
                onClick={saveTrip}
                style={actionButtonStyle('#0f3d3e', '#0f3d3e', 'white')}
              >
                Save Trip
              </button>
            </div>
          </div>
          
          {/* Right Panel */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={cardStyle}>
              <h2 style={{ 
                textAlign: 'center', 
                marginBottom: '25px',
                color: '#0f3d3e',
                fontSize: '24px'
              }}>
                Trip Review
              </h2>
              
              <div style={{ marginBottom: '25px' }}>
                <div style={reviewRowStyle}>
                  <span>Trip Name:</span>
                  <span style={{ fontWeight: '600' }}>{tripName || 'Not set'}</span>
                </div>
                <div style={reviewRowStyle}>
                  <span>Location:</span>
                  <span style={{ fontWeight: '600' }}>{location}</span>
                </div>
                <div style={reviewRowStyle}>
                  <span>Dates:</span>
                  <span style={{ fontWeight: '600' }}>
                    {new Date(departure).toLocaleDateString('en-US', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    })} - {new Date(returnDate).toLocaleDateString('en-US', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <div style={reviewRowStyle}>
                  <span>Travelers:</span>
                  <span style={{ fontWeight: '600' }}>{travelers} people</span>
                </div>
              </div>
              
              {/* Cost Breakdown */}
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ fontSize: '16px', color: '#666', marginBottom: '15px' }}>Cost Breakdown:</h3>
                <div style={reviewRowStyle}>
                  <span>Base Cost:</span>
                  <span>₹{baseCost}</span>
                </div>
                {selectedDestinations.length > 0 && (
                  <div style={reviewRowStyle}>
                    <span>Destinations:</span>
                    <span>₹{destinationsCost}</span>
                  </div>
                )}
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginTop: '25px',
                paddingTop: '25px',
                borderTop: '2px solid #e0e0e0'
              }}>
                <span style={{ fontSize: '18px', fontWeight: '600' }}>Total Cost:</span>
                <span style={{ fontSize: '28px', fontWeight: '700', color: '#e0b15c' }}>₹{totalCost}</span>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div style={cardStyle}>
              <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#0f3d3e' }}>Trip Summary</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                <div style={statBoxStyle}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f3d3e' }}>{travelers}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Travelers</div>
                </div>
                <div style={statBoxStyle}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f3d3e' }}>{selectedDestinations.length}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Destinations</div>
                </div>
                <div style={statBoxStyle}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f3d3e' }}>₹{cost}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Per Person</div>
                </div>
                <div style={statBoxStyle}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f3d3e' }}>₹{totalCost}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Total</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Trip History Page
function TripHistoryPage({ onProfileClick }) {
  const navigate = useNavigate()
  const [savedTrips, setSavedTrips] = useState([])
  
  // Load trips from localStorage
  useEffect(() => {
    const trips = JSON.parse(localStorage.getItem('savedTrips') || '[]')
    setSavedTrips(trips)
  }, [])
  
  const deleteTrip = (id) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      const updatedTrips = savedTrips.filter(trip => trip.id !== id)
      setSavedTrips(updatedTrips)
      localStorage.setItem('savedTrips', JSON.stringify(updatedTrips))
    }
  }
  
  const repeatTrip = (trip) => {
    navigate('/create-trip')
    alert(`Trip "${trip.name}" loaded for editing!`)
  }
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80) center/cover fixed',
      padding: '40px',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 61, 62, 0.9)'
      }}></div>
      
      <Header onProfileClick={onProfileClick} />
      
      <button
        onClick={() => navigate('/create-trip')}
        style={{
          position: 'relative',
          zIndex: 1,
          background: '#e0b15c',
          color: '#0f3d3e',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '25px',
          fontWeight: '600',
          marginBottom: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#d4a34f'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#e0b15c'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        ← Back to Create Trip
      </button>
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 style={{ 
          textAlign: 'center', 
          fontSize: '48px',
          fontWeight: '700',
          marginBottom: '40px',
          color: '#ffffff'
        }}>
          Your Trip History
        </h1>
        
        {savedTrips.length === 0 ? (
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '40px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>✈️</div>
            <h2 style={{ color: '#0f3d3e', marginBottom: '15px' }}>No Trips Yet</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>
              You haven't created any trips yet. Start planning your first adventure!
            </p>
            <button
              onClick={() => navigate('/create-trip')}
              style={buttonStyle('#0f3d3e', 'white')}
            >
              Create Your First Trip
            </button>
          </div>
        ) : (
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '30px',
            border: '2px solid #e6a84a'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
              padding: '14px 0',
              fontWeight: '700',
              borderBottom: '2px solid #999',
              color: '#0f3d3e'
            }}>
              <span>Trip Name</span>
              <span>Location</span>
              <span>Travelers</span>
              <span>Total Cost</span>
              <span>Actions</span>
            </div>
            
            {savedTrips.map((trip) => (
              <div 
                key={trip.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                  padding: '16px 0',
                  borderBottom: '1px solid #eee',
                  color: '#000',
                  alignItems: 'center',
                  transition: 'background 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f9f9f9'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <div>
                  <div style={{ fontWeight: '600', color: '#0f3d3e' }}>{trip.name}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{trip.date}</div>
                </div>
                <span>{trip.location}</span>
                <span>{trip.travelers} people</span>
                <span style={{ fontWeight: '600', color: '#27ae60' }}>₹{trip.totalCost}</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => repeatTrip(trip)}
                    style={{
                      background: '#0f3d3e',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '15px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Repeat
                  </button>
                  <button
                    onClick={() => deleteTrip(trip.id)}
                    style={{
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '15px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Style functions
const buttonStyle = (bgColor, textColor) => ({
  padding: '16px 32px',
  background: bgColor,
  color: textColor,
  border: 'none',
  borderRadius: '30px',
  fontSize: '18px',
  fontWeight: '600',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  transition: 'all 0.3s'
})

const cardStyle = {
  background: 'white',
  borderRadius: '12px',
  padding: '25px',
  border: '2px solid #f2b45b',
  marginBottom: '30px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
}

const sectionLabelStyle = {
  background: '#0f3d3e',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '6px',
  display: 'inline-block',
  marginBottom: '20px',
  fontSize: '14px',
  fontWeight: '600'
}

const tripNameInputStyle = {
  width: '100%',
  padding: '16px',
  fontSize: '18px',
  borderRadius: '8px',
  border: '2px solid #f2b45b',
  background: 'white',
  color: '#000',
  transition: 'all 0.3s'
}

const inputLabelStyle = {
  fontSize: '12px',
  color: '#666',
  marginBottom: '8px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  border: '2px solid #e0e0e0',
  borderRadius: '8px',
  fontSize: '16px',
  background: 'white',
  color: '#000',
  transition: 'all 0.3s'
}

const counterButtonStyle = {
  background: '#0f3d3e',
  color: 'white',
  border: 'none',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  fontSize: '20px',
  cursor: 'pointer',
  transition: 'all 0.3s'
}

const counterDisplayStyle = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#000',
  minWidth: '40px',
  textAlign: 'center'
}

const currencySymbolStyle = {
  position: 'absolute', 
  left: '12px', 
  top: '50%', 
  transform: 'translateY(-50%)',
  color: '#666',
  fontWeight: '600'
}

const costDisplayStyle = {
  background: '#f8f9fa',
  padding: '15px',
  borderRadius: '8px',
  border: '2px dashed #0f3d3e'
}

const actionButtonStyle = (bgColor, borderColor, textColor) => ({
  flex: 1,
  background: bgColor,
  border: `2px solid ${borderColor}`,
  color: textColor,
  padding: '16px',
  borderRadius: '12px',
  fontSize: '18px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s'
})

const reviewRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '12px',
  paddingBottom: '8px',
  borderBottom: '1px solid #f0f0f0'
}

const statBoxStyle = {
  textAlign: 'center',
  padding: '15px',
  background: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #e0e0e0'
}

// Main App Component
function App() {
  const [showProfile, setShowProfile] = useState(false)
  
  return (
    <BrowserRouter>
      <ProfileSidebar isOpen={showProfile} onClose={() => setShowProfile(false)} />
      
      <Routes>
        <Route path="/" element={<HomePage onProfileClick={() => setShowProfile(true)} />} />
        <Route path="/create-trip" element={<CreateTripPage onProfileClick={() => setShowProfile(true)} />} />
        <Route path="/trip-history" element={<TripHistoryPage onProfileClick={() => setShowProfile(true)} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App