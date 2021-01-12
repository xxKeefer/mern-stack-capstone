const toCurrencyString = (priceInCents) => {
  return (priceInCents / 100.0).toFixed(2);
};

module.exports = { toCurrencyString };
