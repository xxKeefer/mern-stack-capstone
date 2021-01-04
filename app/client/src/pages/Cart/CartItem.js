import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import {
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import placeholderImage from "../../images/placeholderImage.png";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme) => {
  const {
    breakpoints,
    palette: { secondary, primary },
  } = theme;
  return {
    card: {
      display: "flex",
      height: "10vw",
      width: "40vw",
      borderRadius: 0,
      backgroundColor: primary.main,
      marginTop: "1rem",
      [breakpoints.only("xs")]: {
        height: "20vw",
        width: "100%",
      },
    },
    details: {
      display: "flex",
    },
    content: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      padding: "0.5rem",
    },
    coverImage: {
      width: "10vw",
      height: "100%",
      [breakpoints.only("xs")]: {
        width: "20vw",
      },
    },
    flexedColumn: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      fontSize: "1.5rem",
    },
    artistName: {
      fontSize: "1rem",
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
  };
});

export default function CartItem() {
  const classes = useStyles();

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Card className={classes.card}>
      <div style={{ height: "100%", width: "20vw" }}>
        <CardMedia
          image={placeholderImage}
          className={classes.coverImage}
          title="placeholder"
        ></CardMedia>
      </div>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <div className={classes.flexedColumn}>
            <Typography className={classes.artistName}>
              {/* Needs checks for length to adjust font size */}
              Artist Name
            </Typography>
            <Typography className={classes.recordTitle}>
              {/* Needs checks for length to adjust font size */}
              Record Title That is also quite long
            </Typography>
          </div>
          <div className={classes.flexedColumn}>
            <div className={classes.quantityContainer} style={{ padding: 0 }}>
              <IconButton
                onClick={() => handleIncrement()}
                style={{ height: "1rem" }}
              >
                <AddIcon className={classes.quantityIcons} />
              </IconButton>
              <h3 className={classes.quantityIcons}>{quantity}</h3>
              {quantity > 1 ? (
                <IconButton
                  onClick={() => handleDecrement()}
                  style={{ height: "1rem" }}
                >
                  <RemoveIcon className={classes.quantityIcons} />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => handleDecrement()}
                  style={{ height: "1rem" }}
                  disabled={true}
                >
                  <RemoveIcon className={classes.quantityIcons} />
                </IconButton>
              )}
            </div>
          </div>
          <div className={classes.flexedColumn}>
            <Typography className={classes.recordPrice}>
              ${99 * quantity}
            </Typography>
            <Typography className={classes.removeItem}>Remove Item</Typography>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
