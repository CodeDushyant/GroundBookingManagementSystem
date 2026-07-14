// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://groundbookingmanagementsystem.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include token if needed
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
