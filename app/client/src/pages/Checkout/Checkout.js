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
import { Card } from "@material-ui/core";

const useStyles = (theme) => ({
  paymentContainer: {
    backgroundColor: "EEE",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
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

    return (
      <Card
        style={{
          borderRadius: 0,
          backgroundColor: "#EEE",
          marginBottom: "1rem",
        }}
      >
        <SquarePaymentForm
          sandbox={true}
          applicationId={"sandbox-sq0idb-FjbIBPKhnJ98JvdVZumxIA"} //SANDBOX_APPLICATION_ID
          locationId={"LWB7HW6Z45KS9"} //SANDBOX_LOCATION_ID
          cardNonceResponseReceived={this.cardNonceResponseReceived}
          inputStyles={[
            { backgroundColor: "#EEE" },
            { color: "#333" },
            { fontSize: "1rem" },
          ]}
        >
          <fieldset
            className="sq-fieldset"
            style={{ backgroundColor: "#EEE", border: "none" }}
          >
            <h1>checkout items</h1>
            <div
              className="sq-form-third"
              style={{
                border: "2px solid #333",
                display: "flex",
                justifyContent: "center",
                padding: "1rem",
                fontSize: "1rem",
              }}
            >
              <CreditCardNumberInput />
            </div>
            <div
              className="sq-form-third"
              style={{
                border: "2px solid #333",
                display: "flex",
                justifyContent: "center",
                padding: "1rem",
                fontSize: "1rem",
              }}
            >
              <CreditCardExpirationDateInput />
            </div>
            <div
              className="sq-form-third"
              style={{
                border: "2px solid #333",
                display: "flex",
                justifyContent: "center",
                padding: "1rem",
                fontSize: "1rem",
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
      </Card>
    );
  }
}

export default withStyles(useStyles)(Checkout);
