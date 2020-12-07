import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";

import ToolBarLower from "./ToolBarLower";
import ToolBarUpper from "./ToolBarUpper";

const useStyles = makeStyles((theme) => {
  const {
    palette: { secondary },
    breakpoints,
  } = theme;

  return {
    root: {
      borderBottom: `3px solid ${secondary.main}`,
      boxShadow: `0px 3px 2px -2px ${secondary.main}`,
      margin: "0px auto",
      width: "90vw",
      [breakpoints.up("md")]: {
        width: "80vw",
      },
    },
    toolBarLower: {
      [breakpoints.down("md")]: {
        display: "none",
      },
    },
  };
});

export default function Navbar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <ToolBarUpper />
        <ToolBarLower className={classes.toolBarLower} />
      </AppBar>
    </div>
  );
}
