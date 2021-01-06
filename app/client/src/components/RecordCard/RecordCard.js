import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import { Box, CardContent, Typography } from "@material-ui/core";
import placeholderImage from "../../images/placeholderImage.png";
import useStyles from "./RecordCardStyles";

export default function RecordCard() {
  const classes = useStyles();

  const recordInfo = {
    artistName: "Artist Name",
    recordTitle: "Record Title",
    recordPrice: "$99",
    recordLabel: "Label",
    releaseYear: "1988",
    genres: ["genre", "genre"],
    coverImage: placeholderImage,
    description:
      "This is a record that has been created for whatever reason etc. If this were a long description it would be about this long.",
  };

  const {
    artistName,
    recordTitle,
    recordPrice,
    recordLabel,
    releaseYear,
    genres,
    coverImage,
    description,
  } = recordInfo;

  const [blur, setBlur] = useState("blur(0px)");
  const [display, setDisplay] = useState("none");

  const handleHover = (blurState, displayState) => {
    if (description.length > 0) {
      setBlur(blurState);

      setTimeout(() => {
        setDisplay(displayState);
      }, 300);
    }
  };

  return (
    <Card className={classes.root} raised>
      <Box
        onMouseEnter={() => handleHover("blur(4px)", "block")}
        onMouseLeave={() => handleHover("blur(0px)", "none")}
        style={{ position: "relative" }}
      >
        <img
          alt="record cover"
          src={coverImage}
          className={classes.coverImage}
          style={{
            filter: blur,
            transition: "0.5s filter",
          }}
        />

        {blur && (
          <p
            className={classes.recordDescription}
            style={{
              display: display,
            }}
          >
            {description}
          </p>
        )}
      </Box>
      <CardContent style={{ padding: "2px" }}>
        <div className={classes.flexedRow}>
          <Typography className={classes.artistName}>{artistName}</Typography>
          <Typography className={classes.recordPrice}>{recordPrice}</Typography>
        </div>
        <div className={classes.flexedRow}>
          <Typography className={classes.recordTitle}>{recordTitle}</Typography>
        </div>
        <div className={classes.flexedRow}>
          <Typography className={classes.labelAndYear}>
            {recordLabel} • {releaseYear}
          </Typography>
        </div>
        <div className={classes.flexedRow}>
          <Typography className={classes.cardGenres}>
            {genres === 1
              ? genres[0]
              : genres.map((genre, index) => {
                  return index === genres.length - 1 ? genre : `${genre} / `;
                })}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
