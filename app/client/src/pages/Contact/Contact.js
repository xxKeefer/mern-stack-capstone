import React from "react";
import { Link } from "@material-ui/core/";
import { useForm } from "react-hook-form";
import useStyles from "./ContactStyles";

export default function Contact() {
  const classes = useStyles();
  const { register, handleSubmit, getValues, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={classes.signUpContainer}>
      <div className={classes.formContainer}>
        <h1 className={classes.formTitle}>sign up</h1>
        <form onSubmit={handleSubmit(onSubmit)} id="signUpForm">
          <div className={classes.formGroup}>
            <label className={classes.formLabel} htmlFor="firstName">
              first name
            </label>
            <input
              ref={register({ required: true })}
              className={classes.formInput}
              type="text"
              name="firstName"
            />
            {errors.firstName && errors.firstName.type === "required" && (
              <p className={classes.errorMessage}>This is required</p>
            )}
          </div>

          <div className={classes.formGroup}>
            <label className={classes.formLabel} htmlFor="lastName">
              last name
            </label>
            <input
              ref={register}
              className={classes.formInput}
              type="text"
              name="lastName"
            />
          </div>

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

          <div className={classes.formGroup}>
            <label className={classes.formLabel} htmlFor="confirmPassword">
              confirm password
            </label>
            <input
              ref={register({
                validate: (value) =>
                  value === getValues("password") ? (
                    true
                  ) : (
                    <p>Passwords don't match</p>
                  ),
                required: true,
                minLength: 7,
              })}
              type="password"
              name="confirmPassword"
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
            value="Create Account"
            name="submit"
          />
        </form>
        <p className={classes.signUpMessage}>
          Already have an account?{" "}
          <Link className={classes.bottomLinks} color="secondary">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
