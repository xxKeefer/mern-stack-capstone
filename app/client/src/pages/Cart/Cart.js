import React from "react";
import useStyles from "./CartStyles";
import CartItem from "./CartItem";
import { Box, Container } from "@material-ui/core";
import CartTotals from "./CartTotals";

export default function SignUp() {
  const classes = useStyles();

  return (
    <div className={classes.cartContainer}>
      <h1 className={classes.formTitle}>your cart</h1>
      <Box className={classes.cartInfoBox}>
        <Box
          style={{
            display: "inline-flex",
            flexDirection: "column",
          }}
        >
          <CartItem />
          <CartItem />
          <CartItem />
        </Box>
        <Container
          style={{
            padding: 0,
          }}
        >
          <CartTotals />
        </Container>
      </Box>
    </div>
  );
}
