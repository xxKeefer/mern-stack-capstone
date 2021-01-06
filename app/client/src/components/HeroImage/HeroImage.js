import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const { breakpoints } = theme;
  return {
    imageContainer: {
      margin: "auto",
      width: "100%",
      height: "45vw",
      [breakpoints.up("md")]: {
        width: "90vw",
        height: "30vw",
      },
    },
  };
});

export default function HeroImage({ children }) {
  const classes = useStyles();
  return <div className={classes.imageContainer}>{children}</div>;
}
