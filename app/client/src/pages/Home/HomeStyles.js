import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const {
    breakpoints,
    palette: { fluro, light, primary, secondary },
  } = theme;
  return {
    recordsGrid: {
      padding: "0rem",
    },
    categoryTitle: {
      width: "100%",
      padding: "0.3rem",
      backgroundColor: secondary.main,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 0,
      margin: "2rem 0rem",
      // outline: `4px double ${primary.main}`,
      // outlineOffset: "-3px",
    },
    titleText: {
      letterSpacing: 3,
      fontWeight: 400,
      color: primary.main,
      margin: 0,
    },
    heroContainer: {
      backgroundColor: light.main,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    heroText: {
      fontSize: "2rem",
      letterSpacing: "5px",
      fontWeight: "200",
      textAlign: "center",

      [breakpoints.down("sm")]: {
        fontSize: "1rem",
        letterSpacing: "1px",
      },
      "& span": {
        fontWeight: "400",
        color: fluro.main,
        outline: `4px double ${primary.main}`,
        outlineOffset: "-3px",
        padding: "0.5rem",
        [breakpoints.down("sm")]: {
          fontSize: "1rem",
          letterSpacing: "1px",
          padding: "0.2rem 0.5rem",
        },
      },
    },
  };
});
export default useStyles;
