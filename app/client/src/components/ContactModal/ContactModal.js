import { Card, IconButton, Modal } from "@material-ui/core";
import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "../LoginModal/LoginStyles";
import { useGlobal } from "../../context/GlobalState";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";

export default function ContactModal(props) {
  const classes = useStyles();
  const globe = useGlobal();
  const { contactModal, setContactModal } = props;
  const { register, handleSubmit, errors } = useForm();

  const closeClick = () => {
    setContactModal(false);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Modal className={classes.modal} open={contactModal} onClose={closeClick}>
        <Card className={classes.card}>
          <IconButton className={classes.closeButton}>
            <CloseIcon onClick={closeClick} />
          </IconButton>
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
        </Card>
      </Modal>
    </div>
  );
}
