import {
  Box,
  Card,
  Container,
  Fade,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import theme from "../../components/App/theme";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API } from "../../util/fetch";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useCart } from "../../context/CartContext";

const useStyles = makeStyles((theme) => {
  const {
    palette: { light, primary, secondary },
    breakpoints,
  } = theme;
  return {
    formContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: primary.main,
      padding: "1rem",
      marginBottom: "1rem",
      position: "relative",
    },
    formInput: {
      fontSize: "1rem",
      margin: 0,
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      margin: "0.5rem",
    },
    submitButton: {
      border: `2px solid ${secondary.main}`,
      borderRadius: 0,
      marginTop: "1rem",
      width: "100%",
      padding: "1rem",
      fontSize: "1rem",
      textTransform: "uppercase",
      fontWeight: "400",
    },
    formLabel: { fontSize: "1rem", color: secondary.main },
    errorMessage: { color: "#ed2e38" },
    formTitle: { margin: 0, padding: 0, width: "100%" },
    successfulSubmit: {
      padding: "0.5rem, 2rem",
      backgroundColor: light.main,
      color: secondary.main,
      border: `2px solid ${secondary.main}`,
    },
    inputPairRow: {
      display: "flex",
      [breakpoints.only("xs")]: {
        flexDirection: "column",
      },
    },
    addressLine1Input: {
      fontSize: "1rem",
      margin: 0,
      width: "100%",
    },
    shippingTopBar: {
      display: "flex",
      justifyContent: "space-between",
      padding: "0",
      width: "100%",
      alignItems: "center",
    },
  };
});

export default function ShippingDetails(props) {
  const classes = useStyles();

  const {
    cartState: { cart, shipping },
  } = useCart();

  const [showShippingForm, setShowShippingForm] = useState(false);

  const { register, handleSubmit, errors, setError, reset } = useForm();
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  return (
    <div>
      <Card className={classes.formContainer}>
        <div className={classes.shippingTopBar}>
          <h1 className={classes.formTitle}>shipping details</h1>
          {showShippingForm ? (
            <IconButton onClick={() => setShowShippingForm(!showShippingForm)}>
              <ExpandLess />
            </IconButton>
          ) : (
            <IconButton onClick={() => setShowShippingForm(!showShippingForm)}>
              <ExpandMore />
            </IconButton>
          )}
        </div>

        {showShippingForm && (
          <form onSubmit={handleSubmit(props.onSubmit)} id="shippingDetails">
            <div className={classes.inputPairRow}>
              <div className={classes.formGroup}>
                <label className={classes.formLabel} htmlFor="first_name">
                  first name
                </label>
                <input
                  ref={register({ required: true })}
                  className={classes.formInput}
                  type="text"
                  name="first_name"
                />
                {errors.release_id && errors.release_id.type === "required" && (
                  <p className={classes.errorMessage}>This is required</p>
                )}
              </div>
              <div className={classes.formGroup}>
                <label className={classes.formLabel} htmlFor="last_name">
                  last name
                </label>
                <input
                  ref={register({ required: true })}
                  className={classes.formInput}
                  type="text"
                  name="last_name"
                />
                {errors.release_id && errors.release_id.type === "required" && (
                  <p className={classes.errorMessage}>This is required</p>
                )}
              </div>
            </div>
            <div className={classes.formGroup}>
              <label className={classes.formLabel} htmlFor="addressLine1">
                address line 1
              </label>
              <input
                ref={register({ required: true })}
                className={classes.addressLine1Input}
                type="text"
                name="addressLine1"
              />
              {errors.release_id && errors.release_id.type === "required" && (
                <p className={classes.errorMessage}>This is required</p>
              )}
            </div>

            <div className={classes.inputPairRow}>
              <div className={classes.formGroup}>
                <label className={classes.formLabel} htmlFor="locality">
                  city
                </label>
                <input
                  ref={register({ required: true })}
                  className={classes.formInput}
                  type="text"
                  name="locality"
                />
                {errors.release_id && errors.release_id.type === "required" && (
                  <p className={classes.errorMessage}>This is required</p>
                )}
              </div>
              <div className={classes.formGroup}>
                <label
                  className={classes.formLabel}
                  htmlFor="administrative_district_level_1"
                >
                  state
                </label>
                <input
                  ref={register({ required: true })}
                  className={classes.formInput}
                  type="text"
                  name="administrative_district_level_1"
                />
                {errors.release_id && errors.release_id.type === "required" && (
                  <p className={classes.errorMessage}>This is required</p>
                )}
              </div>
            </div>
            <div className={classes.inputPairRow}>
              <div className={classes.formGroup}>
                <label className={classes.formLabel} htmlFor="country">
                  country
                </label>
                <input
                  ref={register({ required: true })}
                  className={classes.formInput}
                  type="text"
                  name="country"
                />
                {errors.release_id && errors.release_id.type === "required" && (
                  <p className={classes.errorMessage}>This is required</p>
                )}
              </div>
              <div className={classes.formGroup}>
                <label className={classes.formLabel} htmlFor="postcode">
                  postcode
                </label>
                <input
                  ref={register({ required: true })}
                  className={classes.formInput}
                  type="text"
                  name="postcode"
                />
                {errors.release_id && errors.release_id.type === "required" && (
                  <p className={classes.errorMessage}>This is required</p>
                )}
              </div>
            </div>
            <div className={classes.formGroup}>
              <label className={classes.formLabel} htmlFor="phone_number">
                phone number
              </label>
              <input
                ref={register({ required: true })}
                className={classes.formInput}
                type="text"
                name="phone_number"
              />
              {errors.release_id && errors.release_id.type === "required" && (
                <p className={classes.errorMessage}>This is required</p>
              )}
            </div>
            {successfulSubmit && (
              <p className={classes.successfulSubmit}>
                Record Submitted Successfully
              </p>
            )}
            <input
              className={classes.submitButton}
              type="submit"
              value="Add Shipping Details"
              name="submit"
            />
          </form>
        )}
      </Card>
    </div>
  );
}
