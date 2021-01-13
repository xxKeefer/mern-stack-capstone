const { v4: uuidv4 } = require("uuid");
const axios = require("axios").default;
const { SQUARE_API_CONFIG } = require("../utils/squareConfig");

const LOC_ID = "LWB7HW6Z45KS9";

const payNow = async (req, res) => {
  const { nonce, price, customer, order } = req.body;
  const squarePayment = {
    amount_money: {
      amount: price,
      currency: "AUD",
    },
    idempotency_key: uuidv4(),
    source_id: nonce,
    customer_id: customer,
    order_id: order,
    location_id: LOC_ID,
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
