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

  const { isSuper } = auth;

  const { recordModalState, setRecordModalState } = props;
  console.log(props.record);

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
    tracklist,
  } = props.record;

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
      <Card
        className={classes.recordModalCard}
        style={{
          overflowY: "auto",
          position: "relative",
        }}
      >
        <IconButton className={classes.closeButton}>
          <CloseIcon onClick={closeClick} />
        </IconButton>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <div
            className={classes.imageContainer}
            style={{
              width: "300px",
              height: "300px",
              position: "relative",
            }}
          >
            <img
              alt="record cover"
              src={image}
              className={classes.coverImage}
            />
            {preloved && (
              <Chip
                label="pre-loved"
                size="small"
                className={classes.preLovedChip}
              />
            )}
            {isSuper() && (
              <Chip label="edit" size="small" className={classes.editChip} />
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
                {styles.length === 1
                  ? styles[0]
                  : styles[0] + " / " + styles[1]}
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
          {description && (
            <div className={classes.descriptionContainer}>
              <h3 className={classes.infoTitles}>description</h3>
              <p className={classes.description}>{description}</p>
            </div>
          )}

          <div className={classes.trackListContainer}>
            <h3 className={classes.infoTitles}>tracklist</h3>
            {tracklist.map((track) => {
              return (
                <span
                  className={classes.trackList}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <h5>{track.position}</h5>
                  <h5>{track.title}</h5>
                  <h5>{track.duration}</h5>
                </span>
              );
            })}
          </div>
          <div className={classes.catalogNumberContainer}>
            <h3 className={classes.infoTitles}>catalog number</h3>
            <p className={classes.catalogNumber}>{labels[0].catno}</p>
          </div>
        </div>
      </Card>
    </Modal>
  );
}
