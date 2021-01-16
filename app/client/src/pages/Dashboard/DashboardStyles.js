import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const {
    breakpoints,
    palette: { fluro, light, primary, secondary },
  } = theme;
  return {
    dashboardContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
    },
    formContainer: {
      border: "2px solid red",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    formInput: {
      fontSize: "1rem",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      margin: "1rem",
    },
    submitButton: {
      border: "1px solid black",
      margin: "0rem 1rem 1rem",
      color: secondary.main,
      padding: "0.5rem 1rem",
      backgroundColor: primary.main,
      fontSize: "1rem",
    },
    formLabel: { fontSize: "1rem", color: secondary.main },
    errorMessage: { color: "#ed2e38" },
    formTitle: {},
    successfulSubmit: {
      padding: "0.5rem",
      backgroundColor: fluro.main,
      color: secondary.main,
      borderRadius: "5px",
      margin: "auto",
      textAlign: "center",
      fontSize: "0.8rem",
    },
  };
});
export default useStyles;
