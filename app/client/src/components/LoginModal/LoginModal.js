import { Card, makeStyles, Modal } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => {
  return { card: { width: "20vw", height: "40vh", margin: "auto" } };
});

export default function LoginModal(props) {
  const classes = useStyles();
  const closeClick = (state) => {
    props.handleClick(!state);
  };

  return (
    <div>
      <Modal open={props.state}>
        <Card className={classes.card}>
          <CloseIcon onClick={closeClick} />
        </Card>
      </Modal>
    </div>
  );
}
