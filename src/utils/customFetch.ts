import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://typing-jobs-server.vercel.app/api/v1",
  // baseURL:"http://localhost:5000/api/v1",
  withCredentials: true
});

export default customFetch;
