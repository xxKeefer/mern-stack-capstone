import React from "react";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const {
    breakpoints,
    palette: { light, secondary },
  } = theme;
  return {
    imageContainer: {
      margin: "auto",
      width: "100%",
      height: "35vw",
      backgroundColor: light.main,

      [breakpoints.up("md")]: {
        width: "80vw",
        height: "20vw",
      },
    },
  };
});

export default function NewsHero({ children }) {
  const classes = useStyles();
  return <div className={classes.imageContainer}>{children}</div>;
}
