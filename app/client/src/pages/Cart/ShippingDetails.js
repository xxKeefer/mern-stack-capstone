import { Box, Card, Container, Fade, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import theme from "../../components/App/theme";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API } from "../../util/fetch";

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
    },
    addressLine1Input: {
      fontSize: "1rem",
      margin: 0,
      width: "100%",
    },
  };
});

export default function ShippingDetails(props) {
  const classes = useStyles();
  const showShippingForm = true;

  const { register, handleSubmit, errors, setError, reset } = useForm();
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  return (
    <div>
      <Card className={classes.formContainer}>
        <h1 className={classes.formTitle}>shipping</h1>
        {showShippingForm && (
          <form onSubmit={handleSubmit(props.onSubmit())} id="shippingDetails">
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
