import React from "react";
import { makeStyles } from "@material-ui/core";
import NewsHero from "./NewsHero";

const useStyles = makeStyles((theme) => {
  const {
    palette: { secondary },
  } = theme;

  return {
    newsContainer: {
      width: "100%",
      paddingBottom: "5vh",
    },
    pageTitle: {
      color: secondary.main,
      margin: "1rem",
    },
  };
});

export default function News() {
  const classes = useStyles();
  return (
    <div className={classes.newsContainer}>
      <h1 className={classes.pageTitle}>news</h1>
      <NewsHero></NewsHero>
      <span
        style={{
          display: "inline-flex",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ display: "inline-block", padding: "1rem" }}>01/10/2021</h1>
        <h1 style={{ display: "inline-block", padding: "1rem" }}>
          Title of the the thingy
        </h1>
      </span>
    </div>
  );
}
