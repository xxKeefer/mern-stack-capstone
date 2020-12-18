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
      position: "absolute",
      height: "100%",
      padding: "2rem",
    },
    formTitle: {
      color: primary.main,
    },
    formContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    formInput: {
      height: "2rem",
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
    formLabel: { fontSize: "1rem", color: primary.main },
    errorMessage: { color: "#ed2e38" },
    bottomLinks: {
      color: primary.main,
      fontSize: "1rem",
      textDecoration: "underline",
    },
    signUpMessage: { color: primary.main },
  };
});
export default useStyles;
