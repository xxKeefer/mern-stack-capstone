import { Card, IconButton, Modal } from "@material-ui/core";
import React, { useContext, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import LoginForm from "./LoginForm";
import useStyles from "./LoginModalStyles";
import { AuthContext } from "../../context/AuthContext";
import { GlobalContext } from "../../context/GlobalState";

export default function LoginModal(props) {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const globalContext = useContext(GlobalContext);

  const closeClick = (state) => {
    globalContext.setModalState(false);
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={globalContext.modalState}
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
