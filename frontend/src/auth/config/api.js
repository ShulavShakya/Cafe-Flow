import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const publicAPI = axios.create({
  baseURL: BASE_URL,
});

export const privateAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

privateAPI.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest?.url || "";

    if (
      originalRequest._retry ||
      url.includes("/auth/refresh") ||
      url.includes("/auth/login")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
          },
        );

        return privateAPI(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
