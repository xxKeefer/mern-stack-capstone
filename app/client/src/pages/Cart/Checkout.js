import React from "react";
import { API } from "../../util/fetch";
import {
  SquarePaymentForm,
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardCVVInput,
  CreditCardSubmitButton,
} from "react-square-payment-form";
import { withStyles } from "@material-ui/core/styles";
import { Card, IconButton } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useCart } from "../../context/CartContext";

const useStyles = (theme) => ({
  paymentContainer: {
    backgroundColor: "#EEE",
    display: "relative",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  checkoutTopBar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0",
    alignItems: "center",
  },
  ".sq-input": {
    
  }
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
      <Card
        style={{
          borderRadius: 0,
          backgroundColor: "#EEE",
          marginBottom: "1rem",
          padding: "1rem",
          position: "relative",
        }}
      >
        <div className={classes.checkoutTopBar}>
          <h1 style={{ margin: 0 }}>card details</h1>
          {showCardForm ? (
            <IconButton onClick={() => setShowCardForm(!showCardForm)}>
              <ExpandLess />
            </IconButton>
          ) : (
            <IconButton onClick={() => setShowCardForm(!showCardForm)}>
              <ExpandMore />
            </IconButton>
          )}
        </div>
        {showCardForm && (
          <React.Fragment>
            <SquarePaymentForm
              sandbox={true}
              applicationId={"sandbox-sq0idb-FjbIBPKhnJ98JvdVZumxIA"} //SANDBOX_APPLICATION_ID
              locationId={"LWB7HW6Z45KS9"} //SANDBOX_LOCATION_ID
              cardNonceResponseReceived={this.cardNonceResponseReceived}
            >
              <fieldset
                className="sq-fieldset"
                style={{
                  backgroundColor: "#EEE",
                  border: "none",
                  padding: "1rem",
                }}
              >
                <div
                  className="sq-form-third"
                  style={{
                    border: "1px solid #333",
                    display: "flex",
                    justifyContent: "center",
                    padding: "0.5rem",
                    fontSize: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <CreditCardNumberInput />
                </div>
                <div
                  className="sq-form-third"
                  style={{
                    border: "1px solid #333",
                    display: "flex",
                    justifyContent: "center",
                    padding: "0.5rem",
                    fontSize: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <CreditCardExpirationDateInput />
                </div>
                <div
                  className="sq-form-third"
                  style={{
                    border: "1px solid #333",
                    display: "flex",
                    justifyContent: "center",
                    padding: "0.5rem",
                    fontSize: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <CreditCardCVVInput />
                </div>

                <CreditCardSubmitButton>Pay $1.00</CreditCardSubmitButton>
              </fieldset>
            </SquarePaymentForm>

            <div className="sq-error-message">
              {this.state.errorMessages.map((errorMessage) => (
                <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
              ))}
            </div>
          </React.Fragment>
        )}
      </Card>
    );
  }
}

export default withStyles(useStyles)(Checkout);
