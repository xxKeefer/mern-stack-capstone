const Cart = require("../models/cart");

const createCart = async (req, res) => {
  const { square_id, _id: user_id } = req.user;
  const cartObj = { square_id, user_id };

  try {
    const newCart = await Cart.create(cartObj);
    res.status(201).json(newCart);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const retrieveCart = async (req, res) => {
  const { _id: user_id } = req.user;

  try {
    const cart = await Cart.findOne(user_id);
    res.status(200).json(cart);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const addCart = async (req, res) => {};

const removeCart = async (req, res) => {};

const emptyCart = async (req, res) => {
  const { _id: user_id } = req.user;

  try {
    const cart = await Cart.findOneAndDelete(user_id);
    res.status(200).json(cart);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports = {
  createCart,
  retrieveCart,
  addCart,
  removeCart,
  emptyCart,
};
