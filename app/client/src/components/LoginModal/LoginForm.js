import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useStyles from "./LoginStyles";
import { API } from "../../util/fetch";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useGlobal } from "../../context/GlobalState";

export default function LoginForm({ login }) {
  const classes = useStyles();
  const { register, handleSubmit, errors, setError, setValue } = useForm();
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const auth = useAuth();
  const globe = useGlobal();
  const { setMenuDrawer } = globe;

  const submitLoginInfo = async (userInfo) => {
    try {
      const { data } = await API.post("/auth/login", userInfo);
      auth.setAuthState(data);
      setTimeout(() => {
        globe.setLoginModalState(false);
      }, 1300);
      setRedirectOnLogin(true);
      setMenuDrawer(false);
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
            <label className={classes.formLabel} htmlFor="email" name="email">
              email
            </label>
            <input
              ref={register({ required: true })}
              className={classes.formInput}
              type="email"
              name="email"
              aria-label="email"
            />
            {errors.email && errors.email.type === "required" && (
              <span aria-label="alert" className={classes.errorMessage}>
                This is required
              </span>
            )}
            {errors.email && errors.email.type === "manual" && (
              <span aria-label="alert" className={classes.errorMessage}>
                {errors.email.message}
              </span>
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
              aria-label="password"
            />
            {errors.password && errors.password.type === "required" && (
              <span role="alert" className={classes.errorMessage}>
                This is required
              </span>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <span role="alert" className={classes.errorMessage}>
                Minimum 7 characters
              </span>
            )}
          </div>
          <input
            className={classes.submitButton}
            type="submit"
            value="Submit"
            name="submit"
            aria-label="Submit"
          />
        </form>
        <span className={classes.signUpMessage}>
          Don't have an account?
          <Link
            to="/signup"
            className={classes.bottomLinks}
            color="secondary"
            onClick={() => globe.setLoginModalState(false)}
          >
            Sign Up
          </Link>
        </span>
        <Link to="/" className={classes.bottomLinks} color="secondary">
          Reset Password
        </Link>
      </div>
    </React.Fragment>
  );
}
