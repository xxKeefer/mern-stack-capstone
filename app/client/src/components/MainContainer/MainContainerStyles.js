import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const {
    palette: { primary, secondary },
    breakpoints,
  } = theme;

  return {
    root: {
      backgroundColor: primary.main,
      width: "90vw",
      position: "relative",
      display: "flex",
      [breakpoints.up("md")]: {
        width: "80vw",
      },
      height: "100%",
      margin: "5vh auto",
      borderRadius: 0,
    },
  };
});

export default useStyles;
