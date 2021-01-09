import axios from "axios";

const publicFetch = axios.create({
  baseURL: "localhost:8080",
});

export { publicFetch };
