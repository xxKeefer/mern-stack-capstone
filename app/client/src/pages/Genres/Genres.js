import React from "react";
import { makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const {
    palette: { primary, secondary },
  } = theme;
  return {
    genresContainer: {
      backgroundColor: secondary.main,
      width: "100%",
      height: "100%",
      padding: "1rem",
    },
    genresListContainer: {
      width: "100%",
      height: "20vh",
      backgroundColor: primary.main,
      borderRadius: 0,
    },
    pageTitle: {
      color: primary.main,
      marginTop: 0,
    },
  };
});

export default function Genres() {
  const classes = useStyles();
  return (
    <div className={classes.genresContainer}>
      <h1 className={classes.pageTitle}>genres</h1>
      <Paper className={classes.genresListContainer}></Paper>
    </div>
  );
}
