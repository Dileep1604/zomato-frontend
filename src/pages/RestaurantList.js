import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRestaurants, searchNearbyRestaurants } from "../api";
import RestaurantCard from "../components/RestaurantCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import LocationSearch from "../components/LocationSearch"; // Re-enabled the location search
import "./RestaurantList.css";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [detectedFood, setDetectedFood] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageFromUrl = queryParams.get("page");
    if (pageFromUrl) {
      setPage(Number(pageFromUrl));
    } else {
      setPage(1);
    }
    fetchRestaurants();
  }, [location.search]);

  const fetchRestaurants = async () => {
    try {
      const data = await getRestaurants(page, 12); // Pagination parameters: page & limit
      setRestaurants(data.restaurants);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const handleLocationSearch = async (lat, lng, dist) => {
    try {
      console.log(`🔍 Searching for restaurants at ${lat}, ${lng} within ${dist} km`);
      const data = await searchNearbyRestaurants(lat, lng, dist);
      console.log("✅ API Response:", data);

      if (data.restaurants.length === 0) {
        alert("No restaurants found in this area.");
      }
      setRestaurants(data.restaurants);
      setTotalPages(1); // Only 1 page for location-based search
    } catch (error) {
      console.error("❌ Error searching nearby restaurants:", error);
    }
  };

  const handlePageChange = (e, value) => {
    setPage(value);
    navigate(`?page=${value}`, { replace: true });
  };

  return (
    <div className="restaurant-list-container">
      <div className="restaurant-list">
        <h1>🍽️ Best Food Near You</h1>

        {/* Display detected food if available */}
        {detectedFood && (
          <h2 className="detected-food">Detected Food: {detectedFood}</h2>
        )}

        {/* Location Search Component */}
        <LocationSearch onSearch={handleLocationSearch} />

        {/* Display restaurant cards */}
        <div className="grid">
          {restaurants.length === 0 ? (
            <p>No restaurants found. Try searching by location or image.</p>
          ) : (
            restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.restaurant_id}
                restaurant={restaurant}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Stack spacing={2} className="pagination-container">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
