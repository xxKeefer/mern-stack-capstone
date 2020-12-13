import React from "react";
import PaperComponent from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const {
    palette: { primary, secondary },
    breakpoints,
  } = theme;

  return {
    root: {
      backgroundColor: primary.main,
      width: "90vw",
      [breakpoints.up("md")]: {
        width: "80vw",
      },
      minHeight: "70vh",
      margin: "5vh auto",
      //   borderRight: "none",
      //   borderLeft: "none",
      borderRadius: 0,
    },
  };
});

export default function Paper() {
  const classes = useStyles();
  return (
    <PaperComponent
      className={classes.root}
      variant="outlined"
      elevation={3}
    ></PaperComponent>
  );
}
