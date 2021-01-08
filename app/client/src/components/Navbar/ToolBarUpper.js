import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BoxEmptyDark from "../../icons/BoxEmptyDark";
import IconButton from "@material-ui/core/IconButton";
import React, { useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuDrawer from "./MenuDrawer";
import LoginModal from "../LoginModal/LoginModal";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

const useStyles = makeStyles((theme) => {
  const {
    palette: { secondary },
    typography,
  } = theme;

  return {
    root: {},
    toolBarUpper: {
      maxHeight: "5vh",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0rem 0.5rem",
    },
    navIcons: {
      fontSize: "2.5rem",
      color: secondary.main,
    },
    catalogHeading: {
      fontFamily: typography.fontFamilyCoolvetica,
      fontSize: "2.2rem",
      color: secondary.main,
      textDecoration: "none",
      display: "flex",
      alignItems: "center",

      "&:hover": {
        textDecoration: "none",
        borderBottom: "2px solid #Edff00",
      },
    },
    navLinks: {
      color: "#333",
      display: "inline-block",
      cursor: "pointer",
    },
  };
});

export default function ToolBarUpper() {
  const classes = useStyles();
  const theme = useTheme();
  const matchTabletDown = useMediaQuery(theme.breakpoints.down("sm"));
  const matchTabletUp = useMediaQuery(theme.breakpoints.up("sm"));
  const matchDesktopUp = useMediaQuery(theme.breakpoints.up("md"));

  const [modalState, setModalState] = useState(false);

  const handleClick = (state) => {
    setModalState(state);
  };

  return (
    <Toolbar className={classes.toolBarUpper}>
      {matchTabletDown && <MenuDrawer />}
      <Link to="/">
        <h1 className={classes.catalogHeading}>
          {matchDesktopUp ? "catalogmusic" : "catalog"}
        </h1>
      </Link>
      <div>
        <Link to="/dashboard">
          {matchDesktopUp && <h2 className={classes.navLinks}>dashboard</h2>}
          {matchTabletUp && (
            <IconButton
              aria-label="dashboard"
              className={classes.accountButton}
            >
              <SupervisorAccountIcon
                color="secondary"
                className={classes.navIcons}
              />
            </IconButton>
          )}
        </Link>
        <Link to="/login" onClick={() => setModalState(!modalState)}>
          {matchDesktopUp && <h2 className={classes.navLinks}>log in</h2>}
          {matchTabletUp && (
            <IconButton aria-label="account" className={classes.accountButton}>
              <AccountCircleIcon
                color="secondary"
                className={classes.navIcons}
              />
            </IconButton>
          )}
        </Link>
        <Link to="/cart">
          {matchDesktopUp && <h2 className={classes.navLinks}>cart</h2>}
          <IconButton edge="end" aria-label="cart">
            <BoxEmptyDark className={classes.navIcons} viewBox="0 0 60 60" />
          </IconButton>
        </Link>
        <LoginModal
          state={modalState}
          handleClick={(e) => handleClick(e)}
        ></LoginModal>
      </div>
    </Toolbar>
  );
}
