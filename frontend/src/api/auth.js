import axios from "axios";

const API_URL = "http://localhost:3001";

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  localStorage.setItem("token", res.data.access_token);
  return res.data;
};

export const getMovies = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/movies`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
