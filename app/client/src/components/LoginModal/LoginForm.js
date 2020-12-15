import React from "react";
import { Link } from "@material-ui/core/";
import { useForm } from "react-hook-form";
import useStyles from "./LoginModalStyles";

export default function LoginModal(props) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={classes.formContainer}>
      <h1 className={classes.formTitle}>log in</h1>
      <form onSubmit={handleSubmit(onSubmit)} id="loginForm">
        <div className={classes.formGroup}>
          <label className={classes.formLabel} htmlFor="email">
            email
          </label>
          <input
            ref={register({ required: true })}
            className={classes.formInput}
            type="email"
            name="email"
          />
          {errors.email && errors.email.type === "required" && (
            <p className={classes.errorMessage}>This is required</p>
          )}
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formLabel} htmlFor="password">
            password
          </label>
          <input
            ref={register({ required: true, minLength: 7 })}
            type="password"
            name="password"
            className={classes.formInput}
          />{" "}
          {errors.password && errors.password.type === "required" && (
            <p className={classes.errorMessage}>This is required</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className={classes.errorMessage}>Minimum 7 characters</p>
          )}
        </div>
        <input
          className={classes.submitButton}
          type="submit"
          value="Submit"
          name="submit"
        />
      </form>
      <p className={classes.signUpMessage}>
        Don't have an account?{" "}
        <Link href="/signup" className={classes.bottomLinks} color="secondary">
          Sign Up
        </Link>
      </p>
      <Link className={classes.bottomLinks} color="secondary">
        Reset Password
      </Link>
    </div>
  );
}
