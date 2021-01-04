import React from "react";
import RecordCard from "../../components/RecordCard/RecordCard";
import { Grid } from "@material-ui/core";
import HeroImage from "../../components/HeroImage/HeroImage";
import catalogLogo from "../../images/catalog-long-logo.jpg";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    recordsGrid: {
      padding: "3rem 0rem",
    },
  };
});

export default function Home() {
  const classes = useStyles();
  return (
    <Grid container>
      <HeroImage>
        <img
          alt="catalog logo"
          src={catalogLogo}
          style={{ width: "100%", height: "100%", margin: "auto" }}
        ></img>
      </HeroImage>

      <Grid
        className={classes.recordsGrid}
        container
        justify="center"
        spacing={2}
      >
        <Grid item sm={4} md="auto">
          <RecordCard />
        </Grid>
        <Grid item sm={4} md="auto">
          <RecordCard />
        </Grid>
        <Grid item sm={4} md="auto">
          <RecordCard />
        </Grid>
        <Grid item sm={4} md="auto">
          <RecordCard />
        </Grid>
        <Grid item sm={4} md="auto">
          <RecordCard />
        </Grid>
        <Grid item sm={4} md="auto">
          <RecordCard />
        </Grid>
        <Grid item sm={4} md="auto">
          <RecordCard />
        </Grid>
        <Grid item sm={4} md="auto">
          <RecordCard />
        </Grid>
        <Grid item sm={4} md="auto">
          <RecordCard />
        </Grid>
        <Grid item sm={4} md="auto">
          <RecordCard />
        </Grid>
        <Grid item sm={4} md="auto">
          <RecordCard />
        </Grid>
        <Grid item sm={4} md="auto">
          <RecordCard />
        </Grid>
        <Grid item sm={4} md="auto">
          <RecordCard />
        </Grid>
        <Grid item sm={4} md="auto">
          <RecordCard />
        </Grid>
      </Grid>
    </Grid>
  );
}
