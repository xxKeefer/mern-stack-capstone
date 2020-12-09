import { makeStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BoxEmptyDark from "../../icons/BoxEmptyDark";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuDrawer from "./MenuDrawer";

const useStyles = makeStyles((theme) => {
  const {
    palette: { secondary },
    typography,
  } = theme;

  return {
    root: {},
    toolBarUpper: {
      maxHeight: "6.25vh",
      justifyContent: "space-between",
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
    },
    navIcons: {
      fontSize: "2.5rem",
      color: secondary.main,
    },
    catalogHeading: {
      fontFamily: typography.fontFamilyCoolvetica,
      fontSize: "2.5rem",
      marginBottom: "2rem",
    },
  };
});

export default function ToolBarUpper() {
  const classes = useStyles();
  const theme = useTheme();
  const matchTabletDown = useMediaQuery(theme.breakpoints.down("sm"));
  const matchTabletUp = useMediaQuery(theme.breakpoints.up("sm"));
  const matchDesktopUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Toolbar className={classes.toolBarUpper}>
      {matchTabletDown && <MenuDrawer />}
      <h1 className={classes.catalogHeading}>
        {matchDesktopUp ? "catalogmusic" : "catalog"}
      </h1>
      <div>
        {matchDesktopUp && <h2 style={{ display: "inline-block" }}>log in</h2>}
        {matchTabletUp && (
          <IconButton aria-label="account" className={classes.accountButton}>
            <AccountCircleIcon className={classes.navIcons} />
          </IconButton>
        )}
        {matchDesktopUp && <h2 style={{ display: "inline-block" }}>cart</h2>}
        <IconButton edge="end" aria-label="cart">
          <BoxEmptyDark
            color="secondary"
            viewBox="0 0 60 60"
            style={{ fontSize: "2.5rem" }}
          />
        </IconButton>
      </div>
    </Toolbar>
  );
}
