import React from "react";
import { API } from "../../util/fetch";
import "react-square-payment-form/lib/default.css";
import {
  SquarePaymentForm,
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardCVVInput,
  CreditCardSubmitButton,
} from "react-square-payment-form";

export default class Checkout extends React.Component {
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
    return (
      <div>
        <h1>checkout items</h1>

        <SquarePaymentForm
          sandbox={true}
          applicationId={"sandbox-sq0idb-FjbIBPKhnJ98JvdVZumxIA"} //SANDBOX_APPLICATION_ID
          locationId={"LWB7HW6Z45KS9"} //SANDBOX_LOCATION_ID
          cardNonceResponseReceived={this.cardNonceResponseReceived}
        >
          <fieldset className="sq-fieldset">
            <CreditCardNumberInput />
            <div className="sq-form-third">
              <CreditCardExpirationDateInput />
            </div>

            <div className="sq-form-third">
              <CreditCardCVVInput />
            </div>
          </fieldset>

          <CreditCardSubmitButton>Pay $1.00</CreditCardSubmitButton>
        </SquarePaymentForm>

        <div className="sq-error-message">
          {this.state.errorMessages.map((errorMessage) => (
            <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
          ))}
        </div>
      </div>
    );
  }
}
