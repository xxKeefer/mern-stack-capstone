import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import RecordCard from "../RecordCard/RecordCard";

const useStyles = makeStyles((theme) => {
  return {
    resultsContainer: {
      width: "100%",
      margin: 0,
      padding: "1rem 0rem",
      height: "100%",
      display: "flex",
      justifyContent: "center",
    },
    gridContainer: {
      padding: 0,
      width: "100%",
    },
  };
});

export default function ResultsGrid(props) {
  const classes = useStyles();
  const { query, status } = props;

  return (
    <Grid container justify="space-evenly" className={classes.gridContainer}>
      {status === "success" &&
        query.map((record) => {
          return (
            <Grid item key={record.discogs_id}>
              <RecordCard record={record} />
            </Grid>
          );
        })}
    </Grid>
  );
}
