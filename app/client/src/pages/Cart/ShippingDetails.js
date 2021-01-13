import { Box, Container, Fade, makeStyles } from "@material-ui/core";
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
    dashboardContainer: {
      width: "100%",
      border: "2px solid black",
    },
    formContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: primary.main,
    },
    formInput: {
      fontSize: "1rem",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      margin: "1rem",
    },
    submitButton: {
      border: "1px solid black",
      margin: "0rem 1rem 1rem",
      color: secondary.main,
      padding: "0.5rem 1rem",
      backgroundColor: primary.main,
      fontSize: "1rem",
    },
    formLabel: { fontSize: "1rem", color: secondary.main },
    errorMessage: { color: "#ed2e38" },
    formTitle: {},
    successfulSubmit: {
      padding: "0.5rem, 2rem",
      backgroundColor: light.main,
      color: secondary.main,
      border: `2px solid ${secondary.main}`,
    },
  };
});

export default function ShippingDetails(props) {
  const classes = useStyles();

  const { register, handleSubmit, errors, setError, reset } = useForm();
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  return (
    <div>
      <div className={classes.formContainer}>
        <h3 className={classes.formTitle}>Shipping Details</h3>
        <form onSubmit={handleSubmit(props.onSubmit)} id="shippingDetails">
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
          <div className={classes.formGroup}>
            <label className={classes.formLabel} htmlFor="address_line_1">
              address line 1
            </label>
            <input
              ref={register({ required: true })}
              className={classes.formInput}
              type="text"
              name="address_line_1"
            />
            {errors.release_id && errors.release_id.type === "required" && (
              <p className={classes.errorMessage}>This is required</p>
            )}
          </div>

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

          <div className={classes.formGroup}>
            {/* TODO: country needs to be a 2 char country code  like AU for Australia */}
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
            <label className={classes.formLabel} htmlFor="postal_code">
              postcode
            </label>
            <input
              ref={register({ required: true })}
              className={classes.formInput}
              type="text"
              name="postal_code"
            />
            {errors.release_id && errors.release_id.type === "required" && (
              <p className={classes.errorMessage}>This is required</p>
            )}
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
      </div>
    </div>
  );
}
