import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const {
    palette: { secondary, primary },
    breakpoints,
  } = theme;

  return {
    root: {
      backgroundColor: primary.main,
      width: "90vw",
      // boxShadow: "none",
      // border: `1px solid ${secondary.main}`,
      [breakpoints.up("md")]: {
        width: "15vw",
        minHeight: "23vw",
      },
      maxWidth: "200px",
      borderRadius: 0,
      margin: "auto",
    },
    artistName: { margin: "0px", fontSize: "14px" },
    recordPrice: { fontSize: "14px", marginRight: "0.5rem" },
    recordTitle: { fontSize: "12px" },
    labelAndYear: { fontSize: "12px", color: "#808080" },
    cardGenres: { textTransform: "uppercase", fontSize: "10px" },
    coverImage: {
      height: "90vw",
      width: "90vw",
      maxWidth: "200px",
      maxHeight: "200px",
      [breakpoints.up("md")]: {
        height: "15vw",
        width: "15vw",
        filter: "blur(0px)",
        transition: "1s filter",
      },
    },
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
  };
});

export default useStyles;
