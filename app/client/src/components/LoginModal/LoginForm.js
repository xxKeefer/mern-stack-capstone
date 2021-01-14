import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useStyles from "./LoginModalStyles";
import { API } from "../../util/fetch";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useGlobal } from "../../context/GlobalState";

export default function LoginForm(props) {
  const classes = useStyles();
  const { register, handleSubmit, errors, setError } = useForm();
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const auth = useAuth();
  const globe = useGlobal();

  const submitLoginInfo = async (userInfo) => {
    try {
      const { data } = await API.post("/auth/login", userInfo);
      auth.setAuthState(data);
      setTimeout(() => {
        globe.setModalState(false);
      }, 1300);
      setRedirectOnLogin(true);
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.formError);
        const { name, type, message } = error.response.data.formError;
        setError(name, { type, message });
      }
    }
  };

  return (
    <React.Fragment>
      {redirectOnLogin && <Redirect to="/" />}
      <div className={classes.formContainer}>
        <h1 className={classes.formTitle}>log in</h1>
        <form onSubmit={handleSubmit(submitLoginInfo)} id="loginForm">
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
            {errors.email && errors.email.type === "manual" && (
              <p className={classes.errorMessage}>{errors.email.message}</p>
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
          Don't have an account?
          <Link
            to="/signup"
            className={classes.bottomLinks}
            color="secondary"
            onClick={() => globe.setModalState(false)}
          >
            Sign Up
          </Link>
        </p>
        <Link to="/" className={classes.bottomLinks} color="secondary">
          Reset Password
        </Link>
      </div>
    </React.Fragment>
  );
}
