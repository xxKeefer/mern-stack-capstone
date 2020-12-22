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
        width: "170px",
      },
      minHeight: "220px",
      borderRadius: 0,
      margin: "5vh auto",
    },
    artistName: { margin: "0px", fontSize: "14px" },
    recordPrice: { fontSize: "14px" },
    recordTitle: { fontSize: "12px" },
    labelAndYear: { fontSize: "12px", color: "#808080" },
    cardGenres: { textTransform: "uppercase", fontSize: "10px" },
    coverImage: { height: "170px", width: "170px" },
    flexedRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "0px",
    },
  };
});

export default useStyles;
