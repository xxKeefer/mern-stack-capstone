import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const {
    palette: { fluro, primary, secondary },
    breakpoints,
  } = theme;
  return {
    cartContainer: {
      backgroundColor: primary.main,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      paddingTop: 0,
    },
    cartItemsContainer: {
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
      alignItems: "center",
      backgroundColor: primary.main,
      marginBottom: "1.5rem",
    },
    pageTitle: {
      color: secondary.main,
      padding: 0,
    },
    cartInfoBox: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",

      [breakpoints.down("sm")]: {
        flexDirection: "column",
        padding: 0,
      },
    },
    noItemsMessage: {
      color: secondary.main,
      fontWeight: "200",
      borderBottom: `4px double ${fluro.main}`,
      fontStyle: "italic",
      textAlign: "center",
    },
    totalsAndPaymentContainer: {
      backgroundColor: primary.main,
    },
  };
});
export default useStyles;
