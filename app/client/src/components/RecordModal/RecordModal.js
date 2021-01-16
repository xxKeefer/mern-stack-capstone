import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import {
  Box,
  CardContent,
  Chip,
  IconButton,
  Modal,
  Typography,
} from "@material-ui/core";
import useStyles from "./RecordModalStyles";
import CartIcon from "../../icons/BoxFull";
import { toCurrencyString } from "../../util/shop";
import { useCart } from "../../context/CartContext";
import { ACTIONS } from "../../context/reducers/cartReducer";
import { useAuth } from "../../context/AuthContext";
import { useGlobal } from "../../context/GlobalState";
import CloseIcon from "@material-ui/icons/Close";

export default function RecordModal(props) {
  const classes = useStyles();
  const { dispatch } = useCart();
  const auth = useAuth();
  const globe = useGlobal();

  const { isSuper } = auth;
  console.log(isSuper);

  const { recordModalState, setRecordModalState } = globe;

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

  // const record = {
  //   releaseTitle: "releaseTitle",
  //   artist: "artist",
  //   styles: "genre",
  //   image: "image",
  //   labels: "labels",
  //   year: "year",
  //   description: "description",
  //   price: "20",
  //   preloved: "true",
  // // };

  // const {
  //   releaseTitle,
  //   artist,
  //   styles,
  //   image,
  //   labels,
  //   year,
  //   description,
  //   price,
  //   preloved,
  // } = record;

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

  const closeClick = () => {
    setRecordModalState(false);
  };

  return (
    <Modal
      open={recordModalState}
      className={classes.recordModal}
      onClose={closeClick}
    >
      <Card className={classes.recordModalCard}>
        <IconButton className={classes.closeButton}>
          <CloseIcon onClick={closeClick} />
        </IconButton>
        <div
          style={{
            width: "300px",
            height: "300px",
            border: "2px solid red",
            position: "relative",
          }}
        >
          <img alt="record cover" src={image} className={classes.coverImage} />
          {preloved && (
            <Chip
              label="pre-loved"
              size="small"
              className={classes.preLovedChip}
            />
          )}
          {isSuper ? (
            <Chip label="edit" size="small" className={classes.editChip} />
          ) : (
            <Chip
              label="more info"
              size="small"
              className={classes.moreInfoChip}
            />
          )}
        </div>
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
        <div className={classes.descriptionContainer}>
          <p className={classes.description}>{description}</p>
        </div>
        <div className={classes.trackListContainer}>
          <p className={classes.trackList}>{}</p>
        </div>
      </Card>
    </Modal>
  );
}
