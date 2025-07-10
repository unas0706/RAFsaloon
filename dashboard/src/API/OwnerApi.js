import axios from "axios";

const OwnerApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default OwnerApi;
