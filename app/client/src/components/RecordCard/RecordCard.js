import React from "react";
import Card from "@material-ui/core/Card";
import { CardContent, CardMedia, Typography } from "@material-ui/core";
import placeholderImage from "../../images/placeholderImage.png";
import useStyles from "./RecordCardStyles";

export default function RecordCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined" raised>
      <CardMedia
        image={placeholderImage}
        className={classes.coverImage}
        title="placeholder"
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
