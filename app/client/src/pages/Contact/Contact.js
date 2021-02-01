import React from "react";
import { Link } from "@material-ui/core/";
import { useForm } from "react-hook-form";
import { API } from "../../util/fetch";
import useStyles from "./ContactStyles";

export default function Contact() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (formData) => {
    console.log(formData);
    const { data } = await API.post("/mailer/feedback", formData);
    console.log(data);
  };

  return (
    <div className={classes.contactContainer}>
      <div className={classes.formContainer}>
        <h1 className={classes.formTitle}>contact</h1>
        <form onSubmit={handleSubmit(onSubmit)} id="contactForm">
          <div className={classes.formGroup}>
            <label className={classes.formLabel} htmlFor="name">
              name
            </label>
            <input
              ref={register({ required: true })}
              className={classes.formInput}
              type="text"
              name="name"
            />
            {errors.name && errors.name.type === "required" && (
              <p className={classes.errorMessage}>This is required</p>
            )}
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
            <label className={classes.formLabel} htmlFor="message">
              message
            </label>
            <textarea
              ref={register({ required: true, minLength: 7 })}
              name="message"
              className={classes.messageInput}
              rows={5}
            />
            {errors.message && errors.message.type === "required" && (
              <p className={classes.errorMessage}>This is required</p>
            )}
            {errors.message && errors.message.type === "minLength" && (
              <p className={classes.errorMessage}>Minimum 7 characters</p>
            )}
          </div>
          <input
            className={classes.submitButton}
            type="submit"
            value="Send Message"
            name="submit"
          />
        </form>
      </div>
    </div>
  );
}
