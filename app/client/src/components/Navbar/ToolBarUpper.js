import { Link, makeStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BoxEmptyDark from "../../icons/BoxEmptyDark";
import IconButton from "@material-ui/core/IconButton";
import React, { useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuDrawer from "./MenuDrawer";
import LoginModal from "../LoginModal/LoginModal";

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
      alignItems: "center",
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
      color: secondary.main,
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
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
      <Link href="/">
        <h1 className={classes.catalogHeading}>
          {matchDesktopUp ? "catalogmusic" : "catalog"}
        </h1>
      </Link>
      <div>
        <Link component="button" onClick={() => setModalState(!modalState)}>
          {matchDesktopUp && (
            <h2 style={{ color: "#333", display: "inline-block" }}>log in</h2>
          )}
          {matchTabletUp && (
            <IconButton aria-label="account" className={classes.accountButton}>
              <AccountCircleIcon className={classes.navIcons} />
            </IconButton>
          )}
        </Link>

        {matchDesktopUp && <h2 style={{ display: "inline-block" }}>cart</h2>}
        <IconButton edge="end" aria-label="cart">
          <BoxEmptyDark
            color="secondary"
            viewBox="0 0 60 60"
            style={{ fontSize: "2.5rem" }}
          />
        </IconButton>
        <LoginModal
          state={modalState}
          handleClick={(e) => handleClick(e)}
        ></LoginModal>
      </div>
    </Toolbar>
  );
}
