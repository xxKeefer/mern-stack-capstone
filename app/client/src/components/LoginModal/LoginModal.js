import { Card, IconButton, Modal } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import LoginForm from "./LoginForm";
import useStyles from "./LoginModalStyles";

export default function LoginModal(props) {
  const classes = useStyles();
  const closeClick = (state) => {
    props.handleClick(!state);
  };

  return (
    <div>
      <Modal className={classes.modal} open={props.state} onClose={closeClick}>
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
