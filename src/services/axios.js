import axios from "axios";
import { getAuthToken, clearAuthData } from "../utils/storage";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});


if (process.env.NODE_ENV === "development") {
  console.log("API BASE URL:", process.env.REACT_APP_API_BASE_URL);
}


// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response.data,
  (error) => {

    const status = error.response?.status;

    switch (status) {

      case 401:

        clearAuthData();

        if (window.location.pathname !== "/login") {
          window.location.replace("/login");
        }

        break;

      case 500:
        console.error("Server error occurred");
        break;

      default:
        break;
    }

    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;