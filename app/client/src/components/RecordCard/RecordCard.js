import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import {
  Box,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from "@material-ui/core";
import useStyles from "./RecordCardStyles";
import CartIcon from "../../icons/BoxFull";
import { toCurrencyString } from "../../util/shop";
import { useCart } from "../../context/CartContext";
import { ACTIONS } from "../../context/reducers/cartReducer";

export default function RecordCard(props) {
  const classes = useStyles();
  const { dispatch } = useCart();

  const {
    release_title: releaseTitle,
    artists_sort: artist,
    styles,
    image,
    labels,
    year,
    description,
    variations: {
      stock: { price },
    },
    preloved,
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

  const abbreviateTitle = (title, length) => {
    let newTitle = title.split(" (")[0];
    if (newTitle.length > length) {
      const abbreviated = title.slice(0, length);
      return `${abbreviated}...`;
    } else {
      return newTitle;
    }
  };

  return (
    <Card className={classes.card} raised>
      <Box
        onMouseEnter={() => handleHover("blur(50px)", "block")}
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
        {preloved && (
          <Chip
            label="pre-loved"
            size="small"
            className={classes.preLovedChip}
          />
        )}
      </Box>
      <CardContent style={{ position: "relative", padding: "2px" }}>
        <div className={classes.flexedRow}>
          <Typography className={classes.artistName}>
            {abbreviateTitle(artist, 18)}
          </Typography>
          <Typography className={classes.recordPrice}>
            ${toCurrencyString(price)}
          </Typography>
        </div>
        <div className={classes.flexedRow}>
          <Typography className={classes.recordTitle}>
            {abbreviateTitle(releaseTitle, 21)}
          </Typography>
        </div>
        <div className={classes.flexedRow}>
          <Typography className={classes.labelAndYear}>
            {parseLabelData(labels)} • {year}
          </Typography>
        </div>
        <div className={classes.flexedRow}>
          <Typography className={classes.cardGenres}>
            {styles.length === 1 ? styles[0] : styles[0] + " / " + styles[1]}
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
