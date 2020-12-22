import { Button, Card } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  const {
    breakpoints,
    palette: { primary, secondary, fluro },
  } = theme;
  return {
    card: {
      display: "flex",
      flexDirection: "column",
      margin: "1rem",
      borderRadius: 0,
      backgroundColor: primary.main,
      padding: "1rem",
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
    totalsTitle: {},
    checkoutButton: {
      border: `2px solid ${secondary.main}`,
      borderRadius: 0,
      backgroundColor: fluro.main,
      marginTop: "1rem",
    },
    shoppingButton: {
      border: `2px solid ${secondary.main}`,
      borderRadius: 0,
      marginTop: "1rem",
    },
  };
});

export default function CartTotals() {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <div className={classes.totalContainer}>
          <h1 className={classes.totalsTitle}>total</h1>
          <h1 className={classes.totalPrice}>$0</h1>
        </div>
        <Button className={classes.checkoutButton}>Checkout</Button>
        <Button className={classes.shoppingButton}>Continue Shopping</Button>
      </Card>
    </div>
  );
}
