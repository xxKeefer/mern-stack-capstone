import React from "react";
import RecordCard from "../../components/RecordCard/RecordCard";
import { Box, Grid, Paper } from "@material-ui/core";
import HeroImage from "../../components/HeroImage/HeroImage";
import catalogLogo from "../../images/catalog-long-logo.jpg";
import shopImage from "../../images/shop-image.jpg";
import { makeStyles } from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => {
  const {
    palette: { light, primary, secondary },
  } = theme;
  return {
    recordsGrid: {
      padding: "0rem",
    },
    categoryTitle: {
      width: "100%",
      padding: "0.3rem",
      backgroundColor: secondary.main,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 0,
      margin: "2rem 0rem",
    },
    titleText: {
      letterSpacing: 3,
      fontWeight: 400,
      color: primary.main,
      margin: 0,
    },
  };
});

export default function Home() {
  const classes = useStyles();
  return (
    <Grid container style={{}}>
      <HeroImage>
        <img
          alt="catalog records"
          src={shopImage}
          style={{ width: "100%", height: "100%", margin: "auto" }}
        ></img>
      </HeroImage>

      <Paper className={classes.categoryTitle}>
        <h1 className={classes.titleText}>new releases</h1>
      </Paper>
      <Grid
        className={classes.recordsGrid}
        justify="space-evenly"
        container
        spacing={2}
      >
        <Grid item md="auto">
          <RecordCard />
        </Grid>
        <Grid item md="auto">
          <RecordCard />
        </Grid>
        <Grid item md="auto">
          <RecordCard />
        </Grid>
        <Grid item md="auto">
          <RecordCard />
        </Grid>
        <Grid item md="auto">
          <RecordCard />
        </Grid>
      </Grid>
      <Paper className={classes.categoryTitle}>
        <h1 className={classes.titleText}>new pre-loved</h1>
      </Paper>
      <Grid
        className={classes.recordsGrid}
        justify="space-evenly"
        container
        spacing={2}
      >
        <Grid item md="auto">
          <RecordCard />
        </Grid>
        <Grid item md="auto">
          <RecordCard />
        </Grid>
        <Grid item md="auto">
          <RecordCard />
        </Grid>
        <Grid item md="auto">
          <RecordCard />
        </Grid>
        <Grid item md="auto">
          <RecordCard />
        </Grid>
      </Grid>
    </Grid>
  );
}
