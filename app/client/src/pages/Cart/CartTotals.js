import { Button } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { toCurrencyString, evaluateTotalPrice } from "../../util/shop";

const useStyles = makeStyles((theme) => {
  const {
    breakpoints,
    palette: { primary, secondary, fluro },
  } = theme;
  return {
    card: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: primary.main,
      padding: "1rem",
      marginBottom: "1.5rem",

      [breakpoints.only("xs")]: {
        width: "100%",
        margin: 0,
        marginTop: "1rem",
      },
    },
    totalContainer: {
      display: "flex",
      justifyContent: "space-between",
      borderBottom: `2px solid ${secondary.main}`,
    },
    totalsTitle: { padding: 0 },
    checkoutButton: {
      border: `2px solid ${secondary.main}`,
      borderRadius: 0,
      backgroundColor: fluro.main,
      marginTop: "1rem",
      width: "100%",
    },
    shoppingButton: {
      border: `2px solid ${theme.palette.light.main}`,
      borderRadius: 0,
      marginTop: "1rem",
      width: "100%",
    },
  };
});

export default function CartTotals({ setShowCardForm }) {
  const classes = useStyles();
  const {
    cartState: { cart, customer },
  } = useCart();

  return (
    <div className={classes.card}>
      <div className={classes.totalContainer}>
        <h1 className={classes.totalsTitle}>total</h1>
        <h1 className={classes.totalPrice}>
          ${toCurrencyString(evaluateTotalPrice(cart))}
        </h1>
      </div>
      <Button
        className={classes.checkoutButton}
        disabled={!customer && true}
        onClick={() => {
          setShowCardForm(true);
        }}
      >
        {!customer ? "No shipping details" : "Checkout"}
      </Button>
      <Link to="/">
        <Button className={classes.shoppingButton}>Continue Shopping</Button>
      </Link>
      {/* <Button
        className={classes.checkoutButton}
        onClick={() => {
          console.log({ cartState });
        }}
      >
        get cart state
      </Button> */}
    </div>
  );
}
