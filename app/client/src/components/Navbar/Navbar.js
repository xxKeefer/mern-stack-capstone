import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BoxEmptyDark from "../../icons/BoxEmptyDark";

const useStyles = makeStyles((theme) => {
  const {
    palette: { secondary },
    breakpoints,
    typography,
  } = theme;

  return {
    root: {
      borderBottom: `5px solid ${secondary.main}`,
      boxShadow: `0px 3px 2px -2px ${secondary.main}`,
      margin: "auto",
      width: "90vw",
      [breakpoints.up("md")]: {
        width: "80vw",
      },
    },
    toolBar: {
      height: "10vh",
      justifyContent: "space-between",
      border: "2px solid red;",
    },
    toolBarLower: {
      [breakpoints.down("sm")]: {
        display: "none",
      },
      height: "10vh",
      border: "2px solid red;",
    },
    menuButton: {
      paddingLeft: 0,
      [breakpoints.up("md")]: {
        display: "none",
      },
    },
    accountButton: {
      marginRight: "1rem",
    },
    accountIcon: {
      fontSize: "3rem",
      color: secondary.main,
    },
    menuIcon: {
      fontSize: "3rem",
      color: secondary.main,
    },
    catalogHeading: {
      fontFamily: typography.fontFamilyCoolvetica,
      fontSize: "2rem",
      padding: 0,
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
          <h1 className={classes.catalogHeading}>catalog</h1>
          <div>
            <h2 style={{ display: "inline-block" }}>log in</h2>

            <IconButton className={classes.accountButton}>
              <AccountCircleIcon className={classes.menuIcon} />
            </IconButton>
            <h2 style={{ display: "inline-block" }}>cart</h2>

            <IconButton edge="end">
              <BoxEmptyDark
                color="secondary"
                viewBox="0 0 60 60"
                style={{ fontSize: "3rem", alignSelf: "flexEnd" }}
              />
            </IconButton>
          </div>
        </Toolbar>
        <Toolbar className={classes.toolBarLower}></Toolbar>
      </AppBar>
    </div>
  );
}
