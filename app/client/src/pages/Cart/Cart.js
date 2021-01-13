import React, { useContext } from "react";
import useStyles from "./CartStyles";
import CartItem from "./CartItem";
import { Container } from "@material-ui/core";
import CartTotals from "./CartTotals";
import { useCart } from "../../context/CartContext";
import Checkout from "../Checkout/Checkout";
import ShippingDetails from "./ShippingDetails";
import { buildCustomer } from "../../util/shop";
import { useAuth } from "../../context/AuthContext";
import { API } from "../../util/fetch";
import { ACTIONS } from "../../context/reducers/cartReducer";

export default function SignUp() {
  const classes = useStyles();
  const { currentUser } = useAuth();

  const {
    cartState: { cart, shipping },
    dispatch,
  } = useCart();

  const handleShippingSubmit = async (shippingDetails) => {
    const customerObj = buildCustomer(shippingDetails);
    if (currentUser()) {
      customerObj.email_address = currentUser().email;
    } else {
      customerObj.note = "guest customer";
    }

    try {
      const {
        data: { customer },
      } = await API.post("/customer", customerObj);
      dispatch({
        type: ACTIONS.SET_CUSTOMER,
        payload: customer.id,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

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
          {cart.length <= 0 && (
            <p style={{ color: "white", fontSize: "1rem" }}>
              No Items in the Cart
            </p>
          )}
          {cart.map((cartItem) => {
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
