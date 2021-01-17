import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { API } from "../../util/fetch";
import useStyles from "./DashboardStyles";

export default function EditRecords() {
  const classes = useStyles();

  const { register, handleSubmit, errors, reset } = useForm();
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);

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

  const showSuccessfulSubmit = () => {
    setSuccessfulSubmit(true);
    setTimeout(() => {
      setSuccessfulSubmit(false);
    }, 2000);
  };

  return (
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
          <p className={classes.successfulSubmit}>RECORD ADDED SUCCESSFULLY</p>
        )}
        <input
          className={classes.submitButton}
          type="submit"
          value="Add Record"
          name="submit"
        />
      </form>
    </div>
  );
}
