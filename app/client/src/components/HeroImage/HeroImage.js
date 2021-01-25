import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const {
    palette: { light },
    breakpoints,
  } = theme;
  return {
    imageContainer: {
      margin: "auto",
      width: "100%",
      height: "45vw",
      backgroundColor: light.main,
      [breakpoints.up("md")]: {
        height: "25vw",
      },
    },
  };
});

export default function HeroImage({ children }) {
  const classes = useStyles();
  return <div className={classes.imageContainer}>{children}</div>;
}
