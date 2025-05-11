import axios from "axios";

const OwnerApi = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

export default OwnerApi;
