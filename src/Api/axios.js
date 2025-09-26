import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/clone-7dc68/us-central1/api",
  // local
  // baseURL: "http://localhost:5000",
  // deployed
  baseURL: "https://shopping-app-backend-figf.onrender.com/",
});

export{axiosInstance}