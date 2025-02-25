import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Card, CardContent, Typography } from "@mui/material";
import "./ImageSearchResults.css"; // Import the new CSS file

const ImageSearchResults = () => {
  const location = useLocation();
  const { results } = location.state || { results: { detectedFood: "", restaurants: [] } };

  return (
    <Container className="image-search-container">
      <h2>Search Results for: {results.detectedFood}</h2>
      {results.restaurants.length > 0 ? (
        results.restaurants.map((restaurant) => (
          <Card key={restaurant._id} className="restaurant-card">
            <CardContent>
              <Typography variant="h5" className="restaurant-name">
                {restaurant.name}
              </Typography>
              <Typography variant="body2" className="restaurant-info">
                Cuisines: {restaurant.cuisines}
              </Typography>
              <Typography variant="body2" className="restaurant-info">
                Location: {restaurant.location.address}, {restaurant.location.city}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No restaurants found for this image.</Typography>
      )}
    </Container>
  );
};

export default ImageSearchResults;
