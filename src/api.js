import axios from "axios";

const API_BASE_URL = "https://zomato-backend-1-t9gk.onrender.com"; 
//  const API_BASE_URL="http://localhost:5000"
export const getRestaurants = async (page, limit) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/restaurants`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching restaurants:", error);
    return { totalRestaurants: 0, restaurants: [] };
  }
};

export const getRestaurantById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/restaurantss/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching restaurant by ID:", error);
    return null;
  }
};

export const searchNearbyRestaurants = async (lat, lng, dist) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/nearby`, {
      params: { latitude: lat, longitude: lng, distance: dist },
    });

    console.log("📡 API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching nearby restaurants:", error);
    return { total: 0, restaurants: [] };
  }
};

// ✅ Image-Based Search API
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(`${API_BASE_URL}/api/image-search`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error searching by image:", error);
    return { total: 0, restaurants: [] };
  }
};
