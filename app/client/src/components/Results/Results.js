import React from "react";
import { Container, Grid, GridList, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {});

export default function Results({ children }) {
  const classes = useStyles();
  return (
    <Container>
      <Grid container>{children}</Grid>
    </Container>
  );
}
