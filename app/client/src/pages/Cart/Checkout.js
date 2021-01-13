import React from "react";
import { API } from "../../util/fetch";
import {
  SquarePaymentForm,
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardCVVInput,
  CreditCardSubmitButton,
} from "react-square-payment-form";
import { useTheme, withStyles } from "@material-ui/core/styles";
import { Button, Card, IconButton } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useCart } from "../../context/CartContext";
import "./checkoutStyles.css";
import { Link } from "react-router-dom";

const useStyles = (theme) => ({
  checkoutTopBar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0",
    alignItems: "center",
  },
  checkoutContainer: {
    borderRadius: 0,
    backgroundColor: "#EEE",
    marginBottom: "1rem",
    padding: "1rem",
    position: "relative",
  },
});

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: [],
    };
  }

  submitPayment = async (nonce, price) => {
    const payDetails = { nonce, price };
    try {
      const { data } = await API.post(`/payments/`, payDetails);
      if (data) return data;
    } catch (e) {
      console.log(e.message);
    }
  };

  cardNonceResponseReceived = async (errors, nonce, price) => {
    if (errors) {
      this.setState({ errorMessages: errors.map((error) => error.message) });
      return;
    }

    this.setState({ errorMessages: [] });
    alert("nonce created: " + nonce);
    const paymentResponse = await this.submitPayment(nonce, price);
    console.log({ paymentResponse });
  };

  render() {
    const { classes } = this.props;
    const showCardForm = this.props.showCardForm;
    const setShowCardForm = this.props.setShowCardForm;
    const cart = this.props.cart;

    return (
      <div className={classes.checkoutContainer}>
        <div className={classes.checkoutTopBar}>
          <h1>card details</h1>
          {/* {showCardForm ? (
            <IconButton onClick={() => setShowCardForm(!showCardForm)}>
              <ExpandLess />
            </IconButton>
          ) : (
            <IconButton onClick={() => setShowCardForm(!showCardForm)}>
              <ExpandMore />
            </IconButton>
          )} */}
        </div>
        {/* {showCardForm && ( */}
        <React.Fragment>
          <SquarePaymentForm
            sandbox={true}
            applicationId={"sandbox-sq0idb-FjbIBPKhnJ98JvdVZumxIA"} //SANDBOX_APPLICATION_ID
            locationId={"LWB7HW6Z45KS9"} //SANDBOX_LOCATION_ID
            cardNonceResponseReceived={this.cardNonceResponseReceived}
          >
            <fieldset
              className="sq-fieldset"
              style={{ border: "none", padding: 0 }}
            >
              <div className="sq-form-third">
                <CreditCardNumberInput />
              </div>
              <div className="sq-form-third">
                <CreditCardExpirationDateInput />
              </div>
              <div className="sq-form-third">
                <CreditCardCVVInput />
              </div>

              <CreditCardSubmitButton>PAY</CreditCardSubmitButton>

              <div className="sq-error-message">
                {this.state.errorMessages.map((errorMessage) => (
                  <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
                ))}
              </div>
            </fieldset>
          </SquarePaymentForm>
        </React.Fragment>
        {/* )} */}
      </div>
    );
  }
}

export default withStyles(useStyles)(Checkout);
