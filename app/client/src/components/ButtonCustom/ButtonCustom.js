import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/";

const useStyles = makeStyles((theme) => {
  const {} = theme;
  return {
    button: {},
  };
});

export default function ButtonCustom(props) {
  const { children } = props;
  const classes = useStyles();
  return (
    <Button className={classes.button} {...props}>
      {children}
    </Button>
  );
}
