import React from "react";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";

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
      borderRadius: 0,
      border: "1px solid #808080",
    },
  };
});

export default function MainContainer({ children }) {
  const classes = useStyles();
  return <Box className={classes.root}>{children}</Box>;
}
