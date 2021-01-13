import React, { useContext, useState } from "react";
import useStyles from "./CartStyles";
import CartItem from "./CartItem";
import { Card, Container } from "@material-ui/core";
import CartTotals from "./CartTotals";
import { useCart } from "../../context/CartContext";
import Checkout from "./Checkout";
import ShippingDetails from "./ShippingDetails";

export default function Cart() {
  const classes = useStyles();

  const {
    cartState: { cart, shipping },
  } = useCart();

  const handleShippingSubmit = (data) => {
    console.log(data);
  };

  const [showCardForm, setShowCardForm] = useState(false);

  return (
    <Container className={classes.cartContainer}>
      <h1 className={classes.pageTitle}>your cart</h1>

      <Card className={classes.cartItemsContainer}>
        {cart.length <= 0 && (
          <h2 className={classes.noItemsMessage}>
            there's nothing in your cart!
          </h2>
        )}
        {cart.map((cartItem) => {
          return <CartItem key={cartItem.discogs_id} cartItem={cartItem} />;
        })}
      </Card>
      <ShippingDetails onSubmit={handleShippingSubmit} />
      <Checkout
        showCardForm={showCardForm}
        setShowCardForm={setShowCardForm}
        cart={cart}
      />
      <CartTotals />
    </Container>
  );
}
