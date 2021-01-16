import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const {
    palette: { fluro, secondary, primary },
    breakpoints,
  } = theme;

  return {
    card: {
      backgroundColor: primary.main,
      width: "90vw",
      [breakpoints.up("lg")]: {
        width: "15vw",
      },
      maxWidth: "200px",
      borderRadius: 0,
      margin: 0,
    },
    coverImage: {
      height: "90vw",
      width: "90vw",
      maxWidth: "200px",
      maxHeight: "200px",
      [breakpoints.up("lg")]: {
        height: "15vw",
        width: "15vw",
        filter: "blur(0px)",
        transition: "1s filter",
      },
    },
    artistName: { margin: "0px", fontSize: "14px" },
    recordPrice: { fontSize: "14px", marginRight: "0.5rem" },
    recordTitle: { fontSize: "12px" },
    labelAndYear: { fontSize: "12px", color: "#808080" },
    cardGenres: { textTransform: "uppercase", fontSize: "10px" },

    flexedRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "0px",
    },
    recordDescription: {
      position: "absolute",
      top: 0,
      left: 0,
      padding: "0.5rem",
      textAlign: "justify",
      cursor: "pointer",
      margin: 0,
      color: secondary.main,
      fontSize: "1rem",
    },
    iconContainer: {
      display: "flex",
      flexDirection: "column",
    },
    cartIcon: {
      fontSize: "1.5rem",
    },
    addIcon: {
      fontSize: "0.5rem",
      color: secondary.main,
    },
    preLovedChip: {
      color: secondary.main,
      backgroundColor: fluro.main,
      position: "absolute",
      bottom: 0,
      right: 0,
      margin: "1rem 0.5rem",
    },
    moreInfoChip: {
      color: secondary.main,
      position: "absolute",
      bottom: 0,
      left: 0,
      margin: "1rem 0.5rem",
    },
    editChip: {
      color: secondary.main,
      position: "absolute",
      bottom: 0,
      left: 0,
      margin: "1rem 0.5rem",
    },
  };
});

export default useStyles;
