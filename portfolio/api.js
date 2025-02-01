// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://your-backend-url.com/api"; // Replace with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Example function to fetch data
export const fetchData = async () => {
  try {
    const response = await api.get("/data"); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Example function to upload data
export const uploadData = async (data) => {
  try {
    const response = await api.post("/upload", data); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    console.error("Error uploading data:", error);
    throw error;
  }
};
