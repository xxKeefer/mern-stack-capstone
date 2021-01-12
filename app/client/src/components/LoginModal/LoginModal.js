import { Card, IconButton, Modal } from "@material-ui/core";
import React, { useContext, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import LoginForm from "./LoginForm";
import useStyles from "./LoginModalStyles";
import { useGlobal } from "../../context/GlobalState";

export default function LoginModal(props) {
  const classes = useStyles();
  const globe = useGlobal();
  const closeClick = () => {
    globe.setModalState(false);
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={globe.modalState}
        onClose={closeClick}
      >
        <Card className={classes.card}>
          <IconButton className={classes.closeButton}>
            <CloseIcon onClick={closeClick} />
          </IconButton>
          <LoginForm />
        </Card>
      </Modal>
    </div>
  );
}
