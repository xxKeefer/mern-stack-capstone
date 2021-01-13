import { Button, Card } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { API } from "../../util/fetch";
import { ACTIONS } from "../../context/reducers/cartReducer";
import {
  toCurrencyString,
  evaluateTotalPrice,
  buildLineItems,
} from "../../util/shop";

const useStyles = makeStyles((theme) => {
  const {
    breakpoints,
    palette: { primary, secondary, fluro },
  } = theme;
  return {
    card: {
      display: "flex",
      flexDirection: "column",
      borderRadius: 0,
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
      border: `2px solid ${secondary.main}`,
      borderRadius: 0,
      marginTop: "1rem",
      width: "100%",
    },
  };
});

export default function CartTotals(props) {
  const classes = useStyles();
  const {
    cartState,
    cartState: { cart, customer, order },
    dispatch,
  } = useCart();

  const handleCheckout = async () => {
    const orderDetails = {
      line_items: buildLineItems(cart),
      customer_id: customer,
    };

    try {
      const {
        data: { order },
      } = await API.post("/orders", orderDetails);

      dispatch({
        type: ACTIONS.SET_ORDER,
        payload: order.id,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const handlePayment = async () => {};

  return (
    <div>
      <Card className={classes.card}>
        <div className={classes.totalContainer}>
          <h1 className={classes.totalsTitle}>total</h1>
          <h1 className={classes.totalPrice}>
            ${toCurrencyString(evaluateTotalPrice(cart))}
          </h1>
        </div>
        {/* <Link to="/checkout"> */}
        <Button
          className={classes.checkoutButton}
          onClick={() => {
            handleCheckout();
          }}
        >
          Checkout
        </Button>
        {/* </Link> */}
        <Link to="/">
          <Button className={classes.shoppingButton}>Continue Shopping</Button>
        </Link>
        <Button
          className={classes.checkoutButton}
          onClick={() => {
            handlePayment();
          }}
        >
          fake pay button
        </Button>
        <Button
          className={classes.checkoutButton}
          onClick={() => {
            console.log({ cartState });
          }}
        >
          get cart state
        </Button>
      </Card>
    </div>
  );
}
