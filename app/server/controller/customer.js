const { v4: uuidv4 } = require("uuid");
const axios = require("axios").default;
const { SQUARE_API_CONFIG } = require("../utils/squareConfig");
const User = require("../models/user");

const createCx = async (req, res) => {
  const {
    address,
    email_address,
    family_name,
    given_name,
    phone_number,
  } = req.body;

  const reference_id = req.user._id;

  try {
    const { data } = await axios.post(
      "/customers",
      {
        address,
        email_address,
        family_name,
        given_name,
        phone_number,
        reference_id,
        idempotency_key: uuidv4(),
      },
      SQUARE_API_CONFIG
    );

    //bind square id to user record in mongo
    await User.findByIdAndUpdate(req.user._id, { square_id: data.customer.id });

    res.status(201).json(data);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const updateCx = async (req, res) => {
  const {
    address,
    email_address,
    family_name,
    given_name,
    phone_number,
  } = req.body;

  const reference_id = req.user._id;

  try {
    const { data } = await axios.put(
      `/customers/${req.user.square_id}`,
      {
        address,
        email_address,
        family_name,
        given_name,
        phone_number,
        reference_id,
      },
      SQUARE_API_CONFIG
    );

    //bind square id to user record in mongo
    await User.findByIdAndUpdate(req.user._id, { square_id: data.customer.id });

    res.status(200).json(data);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const deleteCx = async (req, res) => {
  try {
    const { data } = await axios.delete(
      `/customers/${req.user.square_id}`,
      SQUARE_API_CONFIG
    );

    //remove square id from user record in mongo
    await User.findByIdAndUpdate(req.user._id, { square_id: null });

    res.status(200).json(data);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const retrieveCx = async (req, res) => {
  try {
    const { data } = await axios.get(
      `/customers/${req.user.square_id}`,
      SQUARE_API_CONFIG
    );
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

//TODO: finish save payment method functions below

const addCardPayment = (req, res) => {};

const removeCardPayment = (req, res) => {};

module.exports = {
  createCx,
  updateCx,
  deleteCx,
  retrieveCx,
  addCardPayment,
  removeCardPayment,
};
