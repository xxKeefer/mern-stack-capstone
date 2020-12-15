require("dotenv").config();
const axios = require("axios").default;
const token = process.env.DISCOGS_TOKEN;

const Discogs = axios.create({
  baseURL: "https://api.discogs.com/",
  headers: {
    Authorization: `Discogs token=${token}`,
    "User-Agent": "DogolatTestApp/0.0.1",
  },
});

module.exports = { Discogs };
