-- 1. Enable Foreign Keys (Crucial for SQLite)
PRAGMA foreign_keys = ON;

-- 2. Create Users Table
CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Trips Table
CREATE TABLE Trips (
    trip_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    trip_name TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- 4. Create Trip_Stops (Cities) Table
CREATE TABLE Trip_Stops (
    stop_id INTEGER PRIMARY KEY AUTOINCREMENT,
    trip_id INTEGER NOT NULL,
    city_name TEXT NOT NULL,
    country TEXT,
    arrival_date DATE,
    departure_date DATE,
    stop_order INTEGER,
    FOREIGN KEY (trip_id) REFERENCES Trips(trip_id) ON DELETE CASCADE
);

-- 5. Create Activities Catalog
CREATE TABLE Activities_Catalog (
    activity_id INTEGER PRIMARY KEY AUTOINCREMENT,
    city_name TEXT NOT NULL,
    activity_name TEXT NOT NULL,
    category TEXT,
    estimated_cost REAL,
    description TEXT,
    popularity_index INTEGER DEFAULT 0
);

-- 6. Create Trip_Activities Table
CREATE TABLE Trip_Activities (
    trip_activity_id INTEGER PRIMARY KEY AUTOINCREMENT,
    stop_id INTEGER NOT NULL,
    activity_id INTEGER NOT NULL,
    scheduled_date DATE,
    start_time TEXT,
    notes TEXT,
    FOREIGN KEY (stop_id) REFERENCES Trip_Stops(stop_id) ON DELETE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES Activities_Catalog(activity_id)
);

-- 7. Create Budget Table
-- Note: SQLite does not support "Stored Generated Columns" easily in all versions. 
-- We will use a standard table and calculating totals would be done in your App logic or a View.
CREATE TABLE Trip_Budgets (
    budget_id INTEGER PRIMARY KEY AUTOINCREMENT,
    trip_id INTEGER NOT NULL,
    transport_cost REAL DEFAULT 0.00,
    accommodation_cost REAL DEFAULT 0.00,
    food_cost REAL DEFAULT 0.00,
    activities_cost REAL DEFAULT 0.00,
    total_estimated_cost REAL DEFAULT 0.00,
    FOREIGN KEY (trip_id) REFERENCES Trips(trip_id) ON DELETE CASCADE
);

-- 8. Seed (Test) Data
INSERT INTO Activities_Catalog (city_name, activity_name, category, estimated_cost, popularity_index) VALUES 
('Paris', 'Eiffel Tower Tour', 'Sightseeing', 45.00, 95),
('Tokyo', 'Shinjuku Gyoen', 'Nature', 5.00, 85);