const toCurrencyString = (priceInCents) => {
  return (priceInCents / 100.0).toFixed(2);
};

const evaluateTotalPrice = (cart) => {
  return cart.length === 1
    ? cart[0].quantity * cart[0].variations.stock.price
    : cart.reduce((a, b) => a + b.variations.stock.price * b.quantity, 0);
};

const buildLineItems = (cart) => {
  const lineItems = cart.map((item) => {
    return {
      catalog_object_id: item.variations.stock.variation_id,
      quantity: item.quantity,
    };
  });
  return lineItems;
};

const buildCustomer = (shipping) => {
  const { first_name, last_name, phone_number } = shipping;
  delete shipping.phone_number;
  return {
    address: shipping,
    family_name: first_name,
    given_name: last_name,
    phone_number,
  };
};

module.exports = {
  toCurrencyString,
  evaluateTotalPrice,
  buildLineItems,
  buildCustomer,
};
