import React, { useContext } from "react";
import useStyles from "./CartStyles";
import CartItem from "./CartItem";
import { Card, Container } from "@material-ui/core";
import CartTotals from "./CartTotals";
import CartContext from "../../context/CartContext";
import Checkout from "../Checkout/Checkout";
import ShippingDetails from "./ShippingDetails";

export default function Cart() {
  const classes = useStyles();

  const context = useContext(CartContext);

  const handleShippingSubmit = () => {};

  return (
    <div className={classes.cartContainer}>
      <h1 className={classes.pageTitle}>your cart</h1>
      <div className={classes.cartInfoBox}>
        <Card className={classes.cartItemsContainer}>
          {context.cart.length <= 0 && (
            <h1 className={classes.noItemsMessage}>
              there's nothing in your cart!
            </h1>
          )}
          {context.cart.map((cartItem) => {
            return <CartItem key={cartItem.discogs_id} cartItem={cartItem} />;
          })}
        </Card>
        <Container
          style={{
            padding: 0,
            backgroundColor: "EEE",
          }}
        >
          <ShippingDetails onSubmit={handleShippingSubmit} />
          <Checkout />
          <CartTotals />
        </Container>
      </div>
    </div>
  );
}
