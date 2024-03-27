import axios from "axios";

const customFetch = axios.create({
  baseURL: "http://192.168.43.68:5000/api/v1",
  // baseURL:"http://localhost:5000/api/v1",
  withCredentials: true
});

export default customFetch;
