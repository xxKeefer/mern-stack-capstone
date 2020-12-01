import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

// import { IconButton } from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles({
  root: {
    background: "#FFF",
  },
  toolbar: {
    background: "#FFF",
    borderBottom: "5px solid #333333",
    borderShadow: "none",
  },
});

export default function Navbar() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}></Toolbar>
      </AppBar>
    </div>
  );
}
