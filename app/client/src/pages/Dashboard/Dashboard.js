import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import theme from "../../components/App/theme";

const useStyles = makeStyles((theme) => {
  const {
    palette: { primary, secondary },
    breakpoints,
  } = theme;
  return {
    mainContainer: { backgroundColor: primary.main },
  };
});

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <Box className={classes.mainContainer}></Box>
    </div>
  );
}
