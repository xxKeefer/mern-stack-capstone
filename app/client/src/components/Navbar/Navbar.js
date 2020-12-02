import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BoxEmptyDark from "../../icons/BoxEmptyDark";
import { Link, List, ListItem } from "@material-ui/core";

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
    toolBarUpper: {
      maxHeight: "6.25vh",
      justifyContent: "space-between",
      // border: "2px solid red;",
    },
    toolBarLower: {
      [breakpoints.down("sm")]: {
        display: "none",
      },
      height: "6.25vh",
      // border: "2px solid red;",
    },
    navIcons: {
      fontSize: "3rem",
      color: secondary.main,
      margin: "0.5rem",
    },
    catalogHeading: {
      fontFamily: typography.fontFamilyCoolvetica,
      fontSize: "2rem",
      padding: 0,
    },
    navLinks: {
      fontSize: "1.5rem",
      color: secondary.main,
      textDecoration: "none",
      marginRight: "1.5rem",
      cursor: "pointer",
    },
  };
});

export default function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const matchTabletDown = useMediaQuery(theme.breakpoints.down("sm"));
  const matchDesktopUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.toolBarUpper}>
          {matchTabletDown && (
            <IconButton edge="start" className={classes.menuButton}>
              <MenuIcon className={classes.navIcons} />
            </IconButton>
          )}

          <h1 className={classes.catalogHeading}>
            {matchDesktopUp ? "catalogmusic" : "catalog"}
          </h1>
          <div>
            {matchDesktopUp && (
              <React.Fragment>
                <h2 style={{ display: "inline-block" }}>log in</h2>
                <IconButton className={classes.accountButton}>
                  <AccountCircleIcon className={classes.navIcons} />
                </IconButton>
              </React.Fragment>
            )}

            {matchDesktopUp && (
              <h2 style={{ display: "inline-block" }}>cart</h2>
            )}

            <IconButton edge="end">
              <BoxEmptyDark
                color="secondary"
                viewBox="0 0 60 60"
                style={{ fontSize: "3rem", alignSelf: "flexEnd" }}
              />
            </IconButton>
          </div>
        </Toolbar>
        <Toolbar className={classes.toolBarLower}>
          <div>
            <Link className={classes.navLinks}>new vinyl</Link>
            <Link className={classes.navLinks}>genres</Link>
            <Link className={classes.navLinks}>news</Link>
            <Link className={classes.navLinks}>staff picks</Link>
            <Link className={classes.navLinks}>contact</Link>
          </div>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
