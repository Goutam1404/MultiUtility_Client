import axios from "axios";

const API = axios.create({
  baseURL:
  "http://localhost:8000/api",
  withCredentials: true,
});
// "https://multiutility-server.onrender.com/api" ||

export default API;

// new user info :qwertyeng111@gmail.com pass :12345678