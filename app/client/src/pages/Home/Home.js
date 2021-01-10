import React, { useContext } from "react";
import RecordCard from "../../components/RecordCard/RecordCard";
import { Divider, Grid, Paper, Typography } from "@material-ui/core";
import HeroImage from "../../components/HeroImage/HeroImage";
import shopImage from "../../images/shop-image.jpg";
import { makeStyles } from "@material-ui/core";
import placeholderImage from "../../images/placeholderImage.png";
import CartContext from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => {
  const {
    breakpoints,
    palette: { fluro, light, primary, secondary },
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
      // outline: `4px double ${primary.main}`,
      // outlineOffset: "-3px",
    },
    titleText: {
      letterSpacing: 3,
      fontWeight: 400,
      color: primary.main,
      margin: 0,
    },
    heroContainer: {
      backgroundColor: light.main,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    heroText: {
      fontSize: "2rem",
      letterSpacing: "5px",
      fontWeight: "200",
      textAlign: "center",

      [breakpoints.down("sm")]: {
        fontSize: "1rem",
        letterSpacing: "1px",
      },
      "& span": {
        fontWeight: "400",
        color: fluro.main,
        outline: `4px double ${primary.main}`,
        outlineOffset: "-3px",
        padding: "0.5rem",
        [breakpoints.down("sm")]: {
          fontSize: "1rem",
          letterSpacing: "1px",
          padding: "0.2rem 0.5rem",
        },
      },
    },
  };
});

const records = [
  {
    artistName: "First Artist",
    recordTitle: "First Title",
    recordPrice: "$80",
    recordLabel: "First Label",
    releaseYear: "1988",
    genres: ["techno", "house"],
    coverImage: placeholderImage,
    description:
      "This is a record that has been created for whatever reason etc. If this were a long description it would be about this long.",
  },
  {
    artistName: "Second Artist",
    recordTitle: "Second Title",
    recordPrice: "$60",
    recordLabel: "Second Label",
    releaseYear: "1988",
    genres: ["techno", "house"],
    coverImage: placeholderImage,
    description:
      "This is a record that has been created for whatever reason etc. If this were a long description it would be about this long.",
  },
  {
    artistName: "Third Artist",
    recordTitle: "Third Title",
    recordPrice: "$20",
    recordLabel: "Third Label",
    releaseYear: "1988",
    genres: ["techno", "house"],
    coverImage: placeholderImage,
    description:
      "This is a record that has been created for whatever reason etc. If this were a long description it would be about this long.",
  },
  {
    artistName: "Fourth Artist",
    recordTitle: "Fourth Title",
    recordPrice: "$33",
    recordLabel: "Fourth Label",
    releaseYear: "1988",
    genres: ["acid", "house"],
    coverImage: placeholderImage,
    description:
      "This is a record that has been created for whatever reason etc. If this were a long description it would be about this long.",
  },
];

export default function Home(props) {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);

  return (
    <Grid container style={{}}>
      <HeroImage>
        <div className={classes.heroContainer}>
          <Typography className={classes.heroText}>
            {authContext.isAuthenticated() && "LOGGED IN"}
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
        spacing={2}
      >
        {cartContext.records.map((record) => (
          <Grid item xs={12} sm="auto" key={record.recordTitle}>
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
    </Grid>
  );
}
