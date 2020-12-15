import React from "react";
import Box from "@material-ui/core/Box";
import useStyles from "./MainContainerStyles";


export default function MainContainer({ children }) {
  const classes = useStyles();
  return <Box className={classes.root}>{children}</Box>;
}
