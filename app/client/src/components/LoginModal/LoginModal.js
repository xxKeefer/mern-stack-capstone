import { Card, IconButton, Modal } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import LoginForm from "./LoginForm";
import useStyles from "./LoginModalStyles";
import { useGlobal } from "../../context/GlobalState";
import { useAuth } from "../../context/AuthContext";

export default function LoginModal(props) {
  const classes = useStyles();
  const globe = useGlobal();
  const auth = useAuth();

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
          {auth.authState ? (
            <span className={classes.successMessage}>login successful</span>
          ) : (
            <LoginForm />
          )}
        </Card>
      </Modal>
    </div>
  );
}
