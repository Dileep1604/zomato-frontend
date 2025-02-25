import React, { useState } from "react";  // <-- Ensure useState is imported
import { Container, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import LocationSearch from "../components/LocationSearch";
import { uploadImage } from "../api";  // <-- Ensure uploadImage is imported

const Home = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);  // <-- Define selectedFile with useState
  const [loading, setLoading] = useState(false);

  const goToRestaurants = () => {
    navigate("/restaurants");
  };
  const handleLocationSearch = (lat, lng, dist) => {
    console.log(`Searching nearby restaurants at (${lat}, ${lng}) within ${dist} km`);
    navigate(`/restaurants?lat=${lat}&lng=${lng}&dist=${dist}`);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageSearch = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);
    const response = await uploadImage(selectedFile);
    setLoading(false);

    if (response.restaurants.length > 0) {
      navigate("/image-search-results", { state: { results: response } });
    } else {
      alert("No matching restaurants found!");
    }
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", paddingTop: 4 }} className="home-container">
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2, marginBottom: 2 }}>
        <Button variant="contained" color="primary" size="large" onClick={goToRestaurants}>
          Explore All Restaurants
        </Button>
      </Box>

      <LocationSearch onSearch={handleLocationSearch} />

      <div className="image-upload-container">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <Button variant="contained" color="secondary" onClick={handleImageSearch} disabled={loading}>
          {loading ? "Searching..." : "Search by Image"}
        </Button>
      </div>
    </Container>
  );
};
export default Home;
