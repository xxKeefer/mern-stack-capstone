import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const {
    palette: { primary },
    breakpoints,
  } = theme;

  return {
    root: {
      backgroundColor: primary.main,
      [breakpoints.up("md")]: {
        width: "15vw",
      },
      maxWidth: "200px",
      borderRadius: 0,
    },
    artistName: { margin: "0px", fontSize: "14px" },
    recordPrice: { fontSize: "14px" },
    recordTitle: { fontSize: "12px" },
    labelAndYear: { fontSize: "12px", color: "#808080" },
    cardGenres: { textTransform: "uppercase", fontSize: "10px" },
    coverImage: {
      height: "42.5vw",
      width: "42.5vw",
      maxWidth: "200px",
      maxHeight: "200px",
      [breakpoints.up("sm")]: {
        height: "15vw",
        width: "15vw",
      },
    },
    flexedRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "0px",
    },
  };
});

export default useStyles;
