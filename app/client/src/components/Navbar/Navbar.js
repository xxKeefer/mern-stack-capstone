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
      borderBottom: `1px solid ${secondary.main}`,
      boxShadow: `0px 2px 1px -2px ${secondary.main}`,
      margin: "0px auto",
      width: "90vw",
      [breakpoints.only("lg")]: {
        width: "80vw",
      },
      [breakpoints.only("xl")]: {
        width: "70vw",
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
