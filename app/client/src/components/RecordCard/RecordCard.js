import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import { Box, CardContent, IconButton, Typography } from "@material-ui/core";
import useStyles from "./RecordCardStyles";
import CartIcon from "../../icons/BoxFullDark";
import { toCurrencyString } from "../../util/shop";
import { useCart } from "../../context/CartContext";
import { ACTIONS } from "../../context/reducers/cartReducer";

export default function RecordCard(props) {
  const classes = useStyles();
  const { dispatch } = useCart();

  const {
    release_title: releaseTitle,
    artists_sort: artist,
    genres,
    image,
    labels,
    year,
    description,
    variations: {
      stock: { price },
    },
  } = props.record;

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

  const parseLabelData = (labels) => {
    if (labels.length < 1) {
      return "Year";
    } else {
      return labels[0].name;
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
          src={image}
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
      <CardContent style={{ position: "relative", padding: "2px" }}>
        <div className={classes.flexedRow}>
          <Typography
            className={classes.artistName}
            style={
              artist.length > 15
                ? {
                    fontSize: `${1 - artist.length * 0.01}rem`,
                  }
                : { fontSize: "1rem" }
            }
          >
            {artist}
          </Typography>
          <Typography className={classes.recordPrice}>
            ${toCurrencyString(price)}
          </Typography>
        </div>
        <div className={classes.flexedRow}>
          <Typography
            className={classes.recordTitle}
            style={
              artist.length > 15
                ? {
                    fontSize: `${0.9 - artist.length * 0.01}rem`,
                  }
                : { fontSize: "1rem" }
            }
          >
            {releaseTitle}
          </Typography>
        </div>
        <div className={classes.flexedRow}>
          <Typography className={classes.labelAndYear}>
            {parseLabelData(labels)} • {year}
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
        <IconButton
          edge="end"
          style={{
            position: "absolute",
            bottom: -4,
            right: 8,
          }}
          onClick={() => {
            dispatch({
              type: ACTIONS.ADD_RECORD,
              payload: props.record,
            });
          }}
        >
          <div className={classes.iconContainer}>
            <span className={classes.addIcon}>ADD</span>
            <CartIcon
              className={classes.cartIcon}
              color="secondary"
              viewBox="0 0 60 60"
            />
          </div>
        </IconButton>
      </CardContent>
    </Card>
  );
}
