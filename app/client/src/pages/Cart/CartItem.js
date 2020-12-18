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
    palette: { secondary, primary },
  } = theme;
  return {
    card: {
      display: "flex",
      height: "10vw",
      width: "40vw",
      borderRadius: 0,
      backgroundColor: primary.main,
      margin: "1rem",
    },
    details: {
      display: "flex",
      flexGrow: "1",
    },
    content: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      padding: "1rem",
    },
    coverImage: {
      width: "10vw",
    },
    flexedColumn: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      fontSize: "1.5rem",
    },
    artistName: {
      fontSize: "1.5rem",
    },
    recordTitle: {
      fontSize: "1rem",
      fontWeight: "200",
    },
    recordPrice: {
      fontSize: "1.5rem",
      textAlign: "right",
    },
    removeItem: {
      textAlign: "right",
      fontSize: "1rem",
    },
    quantityContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: secondary.main,
      fontSize: "1rem",
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
      <CardMedia
        image={placeholderImage}
        className={classes.coverImage}
        title="placeholder"
      ></CardMedia>
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
            <div className={classes.quantityContainer}>
              <IconButton onClick={() => handleIncrement()}>
                <AddIcon />
              </IconButton>
              <h3>{quantity}</h3>
              {quantity > 1 ? (
                <IconButton onClick={() => handleDecrement()}>
                  <RemoveIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleDecrement()} disabled={true}>
                  <RemoveIcon />
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
