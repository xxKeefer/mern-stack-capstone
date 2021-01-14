import React from "react";
import { API } from "../../util/fetch";
import { ACTIONS } from "../../context/reducers/cartReducer";
import { withStyles } from "@material-ui/core/styles";
import {
  SquarePaymentForm,
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardCVVInput,
  CreditCardSubmitButton,
} from "react-square-payment-form";
import {
  toCurrencyString,
  evaluateTotalPrice,
  buildLineItems,
} from "../../util/shop";
import "./checkoutStyles.css";

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
      price: evaluateTotalPrice(this.props.cart),
      customer: this.props.customer,
      cart: this.props.cart,
    };
  }

  handleCheckout = async () => {
    const orderDetails = {
      line_items: buildLineItems(this.state.cart),
      customer_id: this.state.customer,
    };

    try {
      const {
        data: { order },
      } = await API.post("/orders", orderDetails);

      this.props.dispatch({
        type: ACTIONS.SET_ORDER,
        payload: order.id,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  submitPayment = async (nonce, price, customer) => {
    const orderDetails = {
      line_items: buildLineItems(this.state.cart),
      customer_id: this.state.customer,
    };
    try {
      const {
        data: { order },
      } = await API.post("/orders", orderDetails);
      const payDetails = {
        nonce,
        price,
        order: order.id,
        customer: this.state.customer,
      };

      const { data } = await API.post(`/payments/`, payDetails);
      if (data) return data;
    } catch (e) {
      console.log(e.message);
    }
  };

  cardNonceResponseReceived = async (errors, nonce) => {
    if (errors) {
      this.setState({ errorMessages: errors.map((error) => error.message) });
      return;
    }
    this.setState({ errorMessages: [] });
    const paymentResponse = await this.submitPayment(nonce, this.state.price);
    //TODO: animate a success screen here
    console.log({ paymentResponse });
  };

  render() {
    const { classes } = this.props;
    const showCardForm = this.props.showCardForm;
    const setShowCardForm = this.props.setShowCardForm;

    return (
      <div className={classes.checkoutContainer}>
        <div className={classes.checkoutTopBar}>
          <h1>card details</h1>
        </div>
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

              <CreditCardSubmitButton>
                PAY ${toCurrencyString(this.state.price)}
              </CreditCardSubmitButton>

              <div className="sq-error-message">
                {this.state.errorMessages.map((errorMessage) => (
                  <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
                ))}
              </div>
            </fieldset>
          </SquarePaymentForm>
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(useStyles)(Checkout);
