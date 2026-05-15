import axios from "axios";

// const BASE_URL = "http://10.124.177.239:8000/api";
const BASE_URL = "http://192.168.100.116:5051/api";
// const BASE_URL = "http://localhost:5051/api";

export const publicAPI = axios.create({
  baseURL: BASE_URL,
});

export const privateAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Optional: handle global errors
// privateAPI.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.log("Unauthorized - maybe refresh token needed");
//     }
//     return Promise.reject(error);
//   },
// );
