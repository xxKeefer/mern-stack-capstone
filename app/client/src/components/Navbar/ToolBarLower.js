import { Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import SearchField from "./SearchField";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => {
  const {
    palette: { secondary },
    breakpoints,
  } = theme;

  return {
    toolBarLower: {
      [breakpoints.down("sm")]: {
        display: "none",
      },
      justifyContent: "space-between",
    },
    navLinks: {
      color: secondary.main,
      fontSize: "1.5rem",
      letterSpacing: 1,
      marginRight: "3vw",
      textDecoration: "none",
      cursor: "pointer",
      "&:hover": {
        textDecoration: "none",
        borderTop: "1px solid #EdFF00",
        borderBottom: "1px solid #Edff00",
      },
    },
  };
});

export default function ToolBarLower() {
  const classes = useStyles();

  return (
    <Toolbar className={classes.toolBarLower}>
      <div>
        <Link className={classes.navLinks}>new vinyl</Link>
        <Link className={classes.navLinks}>genres</Link>
        <Link className={classes.navLinks}>news</Link>
        <Link className={classes.navLinks}>staff picks</Link>
        <Link className={classes.navLinks}>contact</Link>
      </div>
      <SearchField />
    </Toolbar>
  );
}
