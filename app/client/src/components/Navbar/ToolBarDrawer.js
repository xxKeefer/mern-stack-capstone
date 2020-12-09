import { makeStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import BoxEmptyDark from "../../icons/BoxEmptyDark";
import IconButton from "@material-ui/core/IconButton";
import React, { useState, useEffect } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => {
  const {
    palette: { primary, secondary },
    typography,
  } = theme;

  return {
    root: {},
    toolBarDrawer: {
      maxHeight: "6.25vh",
      margin: "auto",
      justifyContent: "space-between",
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
      width: "90vw",
      borderBottom: `3px solid ${primary.main}`,
      boxShadow: `0px 3px 2px -2px ${primary.main}`,
    },
    navIcons: {
      fontSize: "2.5rem",
      color: primary.main,
    },
    catalogHeading: {
      fontFamily: typography.fontFamilyCoolvetica,
      fontSize: "2.5rem",
      marginBottom: "2rem",
    },
  };
});

export default function ToolBarDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchMobileOnly = useMediaQuery(theme.breakpoints.only("xs"));

  const closeClick = (event) => {
    props.handleClick(!event);
  };

  return (
    <Toolbar className={classes.toolBarDrawer}>
      <IconButton style={{ padding: "0px" }}>
        <CloseIcon className={classes.navIcons} onClick={closeClick} />
      </IconButton>
      <h1 className={classes.catalogHeading}>
        {matchMobileOnly ? "catalog" : "catalogmusic"}
      </h1>

      <IconButton edge="end" aria-label="cart">
        <BoxEmptyDark
          color="primary"
          viewBox="0 0 60 60"
          style={{ fontSize: "2.5rem" }}
        />
      </IconButton>
    </Toolbar>
  );
}
