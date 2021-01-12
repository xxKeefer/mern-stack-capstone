import React, { useContext } from "react";
import useStyles from "./CartStyles";
import CartItem from "./CartItem";
import { Box, Container } from "@material-ui/core";
import CartTotals from "./CartTotals";
import CartContext from "../../context/CartContext";
import Checkout from "../Checkout/Checkout";
import ShippingDetails from "./ShippingDetails";

export default function SignUp() {
  const classes = useStyles();

  const context = useContext(CartContext);

  const handleShippingSubmit = () => {};

  return (
    <div className={classes.cartContainer}>
      <h1 className={classes.pageTitle}>your cart</h1>
      <div className={classes.cartInfoBox}>
        <div
          //TODO move inline styles out
          style={{
            display: "flex",
            flexDirection: "column",
            border: "2px solid red",
          }}
        >
          {context.cart.length <= 0 && (
            <p style={{ color: "white", fontSize: "1rem" }}>
              No Items in the Cart
            </p>
          )}
          {context.cart.map((cartItem) => {
            return <CartItem key={cartItem.discogs_id} cartItem={cartItem} />;
          })}
        </div>
        <Container
          style={{
            padding: 0,
            backgroundColor: "EEE",
          }}
        >
          <CartTotals />
          <ShippingDetails onSubmit={handleShippingSubmit} />
          <Checkout></Checkout>
        </Container>
      </div>
    </div>
  );
}
