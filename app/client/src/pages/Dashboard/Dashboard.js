import { Box, Container, Fade, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

export default function Dashboard() {
  const classes = useStyles();

  const { register, handleSubmit, errors, reset } = useForm();
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);

  const showSuccessfulSubmit = () => {
    setSuccessfulSubmit(true);
    setTimeout(() => {
      setSuccessfulSubmit(false);
    }, 1000);
  };

  const submitAddRecord = async (recordInfo) => {
    console.log(recordInfo);
    recordInfo.preloved === "true"
      ? (recordInfo.preloved = true)
      : (recordInfo.preloved = false);
    recordInfo.price = parseInt(recordInfo.price);

    try {
      await API.post("/shop/add", recordInfo);
      showSuccessfulSubmit();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={classes.dashboardContainer}>
        <div className={classes.formContainer}>
          <h3 className={classes.formTitle}>Add Record</h3>
          <form onSubmit={handleSubmit(submitAddRecord)} id="addRecordForm">
            <div className={classes.formGroup}>
              <label className={classes.formLabel} htmlFor="release_id">
                discogs release id
              </label>
              <input
                ref={register({ required: true })}
                className={classes.formInput}
                type="text"
                name="release_id"
              />
              {errors.release_id && errors.release_id.type === "required" && (
                <p className={classes.errorMessage}>This is required</p>
              )}
            </div>
            <div className={classes.formGroup}>
              <label className={classes.formLabel} htmlFor="preloved">
                condition
              </label>
              <select name="preloved" ref={register({ required: true })}>
                <option value="false">New</option>
                <option value="true">Preloved</option>
              </select>

              {errors.price && errors.price.type === "required" && (
                <p className={classes.errorMessage}>This is required</p>
              )}
            </div>
            <div className={classes.formGroup}>
              <label className={classes.formLabel} htmlFor="price">
                price
              </label>
              <input
                ref={register({ required: true })}
                type="text"
                name="price"
                className={classes.formInput}
              />
              {errors.price && errors.price.type === "required" && (
                <p className={classes.errorMessage}>This is required</p>
              )}
            </div>
            <div className={classes.formGroup}>
              <label className={classes.formLabel} htmlFor="description">
                description
              </label>
              <textarea
                ref={register({ required: false })}
                className={classes.formInput}
                type="text"
                name="description"
                row={5}
              />
            </div>
            <div className={classes.formGroup}>
              <label className={classes.formLabel} htmlFor="review">
                review
              </label>
              <textarea
                ref={register({ required: false })}
                className={classes.formInput}
                type="text"
                name="review"
                row={3}
              />
            </div>
            {successfulSubmit && (
              <p className={classes.successfulSubmit}>
                Record Submitted Successfully
              </p>
            )}
            <input
              className={classes.submitButton}
              type="submit"
              value="Add Record"
              name="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
