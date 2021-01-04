import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const {
    palette: { primary, secondary },
    breakpoints,
  } = theme;
  return {
    cartContainer: {
      backgroundColor: secondary.main,
      width: "100%",
      height: "100%",
      padding: "2rem",
    },
    formTitle: {
      color: primary.main,
    },
    cartInfoBox: {
      display: "flex",
      [breakpoints.only("xs")]: {
        flexDirection: "column",
        padding: 0,
      },
    },
  };
});
export default useStyles;
