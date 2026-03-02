import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Configure the API client to inject the Clerk session token.
 * This should be called before making requests that require authentication.
 */
export const setApiAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Request interceptor for logging and auth
api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === "development") {
      const logArgs: unknown[] = [`[API Request] ${config.method?.toUpperCase()} ${config.url}`];
      if (config.data) logArgs.push(config.data);
      console.log(...logArgs);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[API Response] ${response.status} ${response.config.url}`, response.data);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized request to backend API");
    }
    
    if (error.response?.status === 422) {
      console.error("API Validation Error:", error.response.data);
    }

    if (process.env.NODE_ENV === "development") {
      if (error.response) {
        console.error(`[API Error] ${error.response.status} ${error.config?.url}`, error.response.data);
      } else if (error.request) {
        console.error(`[API Network Error] No response received from ${error.config?.url}. Is the backend running?`, error.message);
      } else {
        console.error("[API Setup Error]", error.message);
      }
    }

    return Promise.reject(error);
  }
);
