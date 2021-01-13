import React, { useContext, useState } from "react";
import useStyles from "./CartStyles";
import CartItem from "./CartItem";
import { Card, Container } from "@material-ui/core";
import CartTotals from "./CartTotals";
import { useCart } from "../../context/CartContext";
import Checkout from "./Checkout";
import ShippingDetails from "./ShippingDetails";
import { buildCustomer } from "../../util/shop";
import { useAuth } from "../../context/AuthContext";
import { API } from "../../util/fetch";
import { ACTIONS } from "../../context/reducers/cartReducer";

export default function Cart() {
  const [showCardForm, setShowCardForm] = useState(false);

  const classes = useStyles();
  const { currentUser } = useAuth();
  const {
    cartState,
    cartState: { cart },
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
