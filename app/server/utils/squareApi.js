require("dotenv").config();

const SQUARE_API_CONFIG = {
  baseURL: "https://connect.squareupsandbox.com/v2",
  headers: {
    "Square-Version": "2020-05-28",
    Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
};

module.exports = { SQUARE_API_CONFIG };
