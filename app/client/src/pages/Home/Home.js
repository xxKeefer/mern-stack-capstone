import React, { useContext } from "react";
import RecordCard from "../../components/RecordCard/RecordCard";
import { Divider, Grid, Paper, Typography } from "@material-ui/core";
import HeroImage from "../../components/HeroImage/HeroImage";
import shopImage from "../../images/shop-image.jpg";
import { makeStyles } from "@material-ui/core";
import placeholderImage from "../../images/placeholderImage.png";
import CartContext from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { GlobalContext } from "../../context/GlobalState";
import { useQuery } from "react-query";
import { API } from "../../util/fetch";
import useStyles from "./HomeStyles";

export default function Home(props) {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const globalContext = useContext(GlobalContext);

  const fetchNewReleases = async () => {
    const promise = await API.get("/records/year/2020");
    return promise.data;
  };

  const { data: newReleases, status, error } = useQuery(
    "newReleases",
    async () => {
      const { data } = await API.get("/records/year/2020");
      return data;
    }
  );

  // const [newReleases, setNewReleases] = useState([]);

  return (
    <Grid container style={{}}>
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
        spacing={2}
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
    </Grid>
  );
}
