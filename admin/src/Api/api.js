import axios from "axios";

const api = axios.create({
  baseURL: "http://16.170.64.21:5000",
  withCredentials: true,
});

export default api;
