import axios from "axios";

const AuthApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export default AuthApi;
