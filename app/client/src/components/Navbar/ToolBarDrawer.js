import { makeStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import BoxEmptyDark from "../../icons/BoxEmptyDark";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => {
  const {
    palette: { secondary, primary },
    typography,
  } = theme;

  return {
    root: {},
    toolBarDrawer: {
      height: "100%",
      margin: "auto",
      justifyContent: "space-between",
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
      width: "90vw",
      maxHeight: "6.25vh",
    },
    closeIcon: {
      fontSize: "2.5rem",
      color: primary.main,
    },
    catalogHeading: {
      fontFamily: typography.fontFamilyCoolvetica,
      fontSize: "2.5rem",
      marginBottom: "2rem",
    },
    navIcons: {
      fontSize: "2.5rem",
      color: primary.main,
    },
  };
});

export default function ToolBarDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchTabletOnly = useMediaQuery(theme.breakpoints.only("sm"));

  const closeClick = (state) => {
    props.handleClick(!state);
  };

  return (
    <Toolbar className={classes.toolBarDrawer}>
      <IconButton edge="start" aria-label="menuClose">
        <CloseIcon className={classes.closeIcon} onClick={closeClick} />
      </IconButton>
      <h1 className={classes.catalogHeading}>catalog</h1>
      <div>
        {matchTabletOnly && (
          <IconButton aria-label="account" className={classes.accountButton}>
            <AccountCircleIcon className={classes.navIcons} />
          </IconButton>
        )}

        <IconButton edge="end" aria-label="cart">
          {/*! Change to BoxEmpty instead of Dark/Light*/}
          <BoxEmptyDark
            className={classes.navIcons}
            viewBox="0 0 60 60"
          />
        </IconButton>
      </div>
    </Toolbar>
  );
}
