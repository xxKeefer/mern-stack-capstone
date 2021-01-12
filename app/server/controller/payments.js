const { v4: uuidv4 } = require("uuid");
const axios = require("axios").default;
const { SQUARE_API_CONFIG } = require("../utils/squareConfig");

const LOC_ID = "LWB7HW6Z45KS9";

const payNow = async (req, res) => {
  const { nonce, token } = req.params;
  const squarePayment = {
    amount_money: {
      amount: 100,
      currency: "AUD",
    },
    idempotency_key: uuidv4(),
    source_id: nonce,
    customer_id: "5H2TCV1R1WYJHEF1MRZBGP0N1W",
    location_id: "LWB7HW6Z45KS9",
    verification_token: token,
  };

  try {
    const { data: payment } = await axios.post(
      "/payments",
      squarePayment,
      SQUARE_API_CONFIG
    );
    res.status(200).json(payment);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports = { payNow };
