import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import BoxEmptyDark from "../../icons/BoxEmptyDark";

const useStyles = makeStyles((theme) => {
  const {
    palette: { secondary },
    breakpoints,
  } = theme;

  return {
    root: {
      borderBottom: `5px solid ${secondary.main}`,
      boxShadow: `0px 3px 2px -2px ${secondary.main}`,
      margin: "auto",
      [breakpoints.up("phone")]: {
        width: "90vw",
      },
      [breakpoints.up("laptop")]: {
        width: "80vw",
      },
    },
    toolBar: {
      justifyContent: "space-between",
    },
    menuButton: {
      paddingLeft: 0,
      [breakpoints.up("laptop")]: {
        display: "none",
      },
    },
    menuIcon: {
      fontSize: "3rem",
      color: secondary.main,
    },
  };
});

export default function Navbar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.toolBar}>
          <IconButton edge="start" className={classes.menuButton}>
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <h3>catalog</h3>
          <IconButton edge="end">
            <BoxEmptyDark
              color="secondary"
              viewBox="0 0 60 60"
              style={{ fontSize: "3rem", alignSelf: "flexEnd" }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
