import React from "react";
import Card from "@material-ui/core/Card";
import {
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import placeholderImage from "../../images/placeholderImage.png";

const useStyles = makeStyles((theme) => {
  const {
    palette: { primary },
    breakpoints,
  } = theme;

  return {
    root: {
      backgroundColor: primary.main,
      [breakpoints.up("md")]: {
        width: "200px",
      },
      minHeight: "280px",
      borderRadius: 0,
      margin: "5vh auto",
    },
    artistName: { margin: "0px", fontSize: "18px" },
    recordPrice: { fontSize: "18px" },
    recordName: { fontSize: "16px" },
    labelAndYear: { fontSize: "12px", color: "#808080" },
    cardGenres: { textTransform: "uppercase", fontSize: "10px" },
    flexedRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "0px",
    },
  };
});

export default function RecordCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined" raised>
      <CardMedia
        image={placeholderImage}
        className={classes.coverImage}
        title="placeholder"
        style={{ height: "200px", width: "200px" }}
      ></CardMedia>
      <CardContent style={{ padding: "2px" }}>
        <div className={classes.flexedRow}>
          <Typography className={classes.artistName}>Artist Name</Typography>
          <Typography className={classes.recordPrice}>$99</Typography>
        </div>
        <div className={classes.flexedRow}>
          <Typography className={classes.recordTitle}>Record Title</Typography>
        </div>
        <div className={classes.flexedRow}>
          <Typography className={classes.labelAndYear}>Label • 1988</Typography>
        </div>
        <div className={classes.flexedRow}>
          <Typography className={classes.cardGenres}>genre / genre</Typography>
        </div>
      </CardContent>
    </Card>
  );
}
