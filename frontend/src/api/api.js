// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

// attach token automatically if available
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
