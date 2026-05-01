import axios from "axios";
import url from "./url";

const api = axios.create({
    baseURL: url + '/api'
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Force logout on invalid token
      localStorage.removeItem("credentials");
      localStorage.removeItem("token");
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;