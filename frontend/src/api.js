import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-eekt.onrender.com/api",
});

export default API;