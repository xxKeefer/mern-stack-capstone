import React from "react";
import { Container, Grid, GridList, makeStyles } from "@material-ui/core";
import RecordCard from "../RecordCard/RecordCard";

const useStyles = makeStyles((theme) => {
  const {
    palette: { primary, secondary },
  } = theme;
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
      height: "100%",
    },
  };
});

export default function RecordRow(props) {
  const classes = useStyles();
  const { records } = props;
  return (
    <div className={classes.resultsContainer}>
      <Grid
        container
        justify="space-evenly"
        className={classes.gridContainer}
        spacing={1}
      >
        {records.length > 0 &&
          records.map((record) => {
            return (
              <Grid item key={record.discogs_id}>
                <RecordCard record={record} />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}
