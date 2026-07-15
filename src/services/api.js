import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized access - perhaps you need to log in?");
          break;
        case 403:
          console.error(
            "Forbidden access - you do not have permission to access this resource.",
          );
          break;
        case 404:
          console.error(
            "Resource not found - the requested resource does not exist.",
          );
          break;
        case 500:
          console.error(
            "Internal server error - something went wrong on the server.",
          );
          break;
        default:
          console.error(
            `An error occurred: ${error.response.status}`,
            error.response.data,
          );
      }
    } else if (error.request) {
      console.error(
        "No response received from the server. Please check your network connection.",
      );
    }
    return Promise.reject(error);
  },
);

export default api;
