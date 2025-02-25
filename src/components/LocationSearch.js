import React, { useState } from "react"; // <-- Ensure useState is imported
import "./LocationSearch.css"; // Import CSS for styling

const LocationSearch = ({ onSearch }) => {
  const [lat, setLatitude] = useState("");
  const [lng, setLongitude] = useState("");
  const [dist, setDistance] = useState("3"); // Default to 3km

  const handleSearch = () => {
    if (!lat || !lng) {
      alert("Please enter valid latitude and longitude!");
      return;
    }

    console.log(
      `📍 Searching nearby restaurants at (${lat}, ${lng}) within ${dist} km`
    );

    onSearch(lat, lng, dist);
  };

  return (
    <div className="location-search">
      <h3 className="location-search-title">Search by Location</h3>
      <input
        type="number"
        placeholder="Enter Latitude"
        value={lat}
        onChange={(e) => setLatitude(e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Enter Longitude"
        value={lng}
        onChange={(e) => setLongitude(e.target.value)}
        className="input"
      />
      <select
        value={dist}
        onChange={(e) => setDistance(e.target.value)}
        className="dropdown"
      >
        <option value="1">1 km</option>
        <option value="3">3 km</option>
        <option value="5">5 km</option>
        <option value="10">10 km</option>
      </select>
      <button onClick={handleSearch} className="search-btn">
        🔍 Search
      </button>
    </div>
  );
};

export default LocationSearch;
