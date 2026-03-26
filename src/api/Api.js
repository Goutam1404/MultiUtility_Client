import axios from "axios";

const API = axios.create({
  baseURL:
    "https://multiutility-server.onrender.com/api" || "http://localhost:8000/api",
  withCredentials: true,
});

export default API;
