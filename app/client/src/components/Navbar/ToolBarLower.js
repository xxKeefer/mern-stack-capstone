import { Link } from "react-router-dom";
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
      fontSize: "1.25rem",
      letterSpacing: 1,
      marginRight: "3vw",
      textDecoration: "none",
      cursor: "pointer",
      "&:hover": {
        textDecoration: "none",
        borderTop: "3px solid #EdFF00",
        borderBottom: "3px solid #Edff00",
      },
    },
  };
});

export default function ToolBarLower() {
  const classes = useStyles();

  return (
    <Toolbar className={classes.toolBarLower}>
      <div>
        <Link to="/" className={classes.navLinks}>
          new vinyl
        </Link>
        <Link to="/genres" className={classes.navLinks}>
          genres
        </Link>
        <Link to="/news" className={classes.navLinks}>
          news
        </Link>
        <Link to="/" className={classes.navLinks}>
          staff picks
        </Link>
        <Link to="/contact" className={classes.navLinks}>
          contact
        </Link>
      </div>
      <SearchField />
    </Toolbar>
  );
}
