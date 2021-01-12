import React from "react";
import Card from "@material-ui/core/Card";
import {
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useCart } from "../../context/CartContext";
import { ACTIONS } from "../../context/reducers/cartReducer";

const useStyles = makeStyles((theme) => {
  const {
    breakpoints,
    palette: { secondary, primary },
  } = theme;
  return {
    card: {
      display: "flex",
      position: "relative",
      height: "10vw",
      width: "40vw",
      borderRadius: 0,
      backgroundColor: primary.main,
      [breakpoints.down("sm")]: {
        height: "20vw",
        width: "100%",
      },
    },
    details: {
      display: "flex",
      width: "100%",
      position: "relative",
    },
    content: {
      display: "flex",
      width: "100%",
      padding: "0.5rem",
      position: "relative",
      justifyContent: "space-between",
    },
    coverImage: {
      width: "10vw",
      height: "100%",
      [breakpoints.down("sm")]: {
        width: "20vw",
      },
    },
    flexedColumn: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      fontSize: "1.5rem",
    },
    leftColumn: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    artistName: {
      fontSize: "1rem",
      textAlign: "left",
    },
    recordTitle: {
      fontSize: "0.8rem",
      fontWeight: "200",
    },
    recordPrice: {
      fontSize: "1.5rem",
      textAlign: "right",
      [breakpoints.only("xs")]: {
        fontSize: "1rem",
      },
    },
    removeItem: {
      textAlign: "right",
      fontSize: "0.8rem",
      cursor: "pointer",
    },
    quantityContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: secondary.main,
      fontSize: "1rem",
      padding: 0,
      [breakpoints.only("xs")]: {
        flexDirection: "column",
      },
    },
    quantityIcons: {
      fontSize: "1rem",
      [breakpoints.only("xs")]: {},
      padding: 0,
      margin: 0,
    },
    cardMediaWrapper: {
      height: "100%",
      width: "10vw",
      [breakpoints.down("sm")]: {
        width: "20vw",
      },
    },
  };
});

export default function CartItem(props) {
  const classes = useStyles();
  const { dispatch } = useCart();

  const { cartItem } = props;
  console.log({ cartItem });

  const {
    artists_sort: artistName,
    release_title: recordTitle,
    variations: {
      stock: { price: recordPrice },
    },
    image: coverImage,
  } = cartItem;

  return (
    <Card className={classes.card}>
      <div className={classes.cardMediaWrapper}>
        <CardMedia
          image={coverImage}
          className={classes.coverImage}
          title="placeholder"
        ></CardMedia>
      </div>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <div className={classes.leftColumn}>
            <Typography className={classes.artistName}>{artistName}</Typography>
            <Typography className={classes.recordTitle}>
              {recordTitle}
            </Typography>
          </div>
          <div className={classes.flexedColumn}>
            <div className={classes.quantityContainer} style={{ padding: 0 }}>
              <IconButton
                onClick={() => {
                  dispatch({
                    type: ACTIONS.ADD_RECORD,
                    payload: cartItem,
                  });
                }}
                style={{ height: "1rem" }}
              >
                <AddIcon className={classes.quantityIcons} />
              </IconButton>
              <h3 className={classes.quantityIcons}>{cartItem.quantity}</h3>
              {cartItem.quantity > 1 ? (
                <IconButton
                  onClick={() => {
                    dispatch({
                      type: ACTIONS.REMOVE_RECORD,
                      payload: cartItem,
                    });
                  }}
                  style={{ height: "1rem" }}
                >
                  <RemoveIcon className={classes.quantityIcons} />
                </IconButton>
              ) : (
                <IconButton style={{ height: "1rem" }} disabled={true}>
                  <RemoveIcon className={classes.quantityIcons} />
                </IconButton>
              )}
            </div>
          </div>
          <div className={classes.flexedColumn}>
            <Typography className={classes.recordPrice}>
              ${((recordPrice / 100.0) * cartItem.quantity).toFixed(2)}
            </Typography>
            <Typography
              className={classes.removeItem}
              onClick={() => {
                dispatch({
                  type: ACTIONS.REMOVE_RECORD,
                  payload: cartItem,
                });
              }}
            >
              Remove Item
            </Typography>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
