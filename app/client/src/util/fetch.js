import axios from "axios";

const publicFetch = axios.create({
  baseURL: "https://dogolat.herokuapp.com",
});

export { publicFetch };
