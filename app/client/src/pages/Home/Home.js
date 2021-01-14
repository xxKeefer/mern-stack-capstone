import React from "react";
import RecordCard from "../../components/RecordCard/RecordCard";
import { Divider, Grid, Paper, Typography } from "@material-ui/core";
import HeroImage from "../../components/HeroImage/HeroImage";
import { useQuery } from "react-query";
import { API } from "../../util/fetch";
import useStyles from "./HomeStyles";

export default function Home(props) {
  const classes = useStyles();

  const { data: newReleases, status } = useQuery("newReleases", async () => {
    const { data } = await API.get("/records/year/2020");
    return data;
  });

  return (
    <div>
      <HeroImage>
        <div className={classes.heroContainer}>
          <Typography className={classes.heroText}>
            HELLO AND WELCOME
          </Typography>
          <Typography className={classes.heroText}>
            to the <span>catalog music</span> webstore
          </Typography>
          <Divider />
        </div>
        {/* <img
          alt="catalog records"
          src={shopImage}
          style={{ width: "100%", height: "100%", margin: "auto" }}
        ></img> */}
      </HeroImage>

      <Paper className={classes.categoryTitle}>
        <h1 className={classes.titleText}>new releases</h1>
      </Paper>
      <Grid
        className={classes.recordsGrid}
        justify="space-evenly"
        container
        spacing={1}
      >
        {status === "success" &&
          newReleases.map((record) => (
            <Grid item xs={12} sm="auto" key={record.discogs_id}>
              <RecordCard record={record} />
            </Grid>
          ))}
      </Grid>
      <Paper className={classes.categoryTitle}>
        <h1 className={classes.titleText}>fresh pre-loved</h1>
      </Paper>
      <Grid
        className={classes.recordsGrid}
        justify="space-evenly"
        container
        spacing={2}
      ></Grid>
    </div>
  );
}
