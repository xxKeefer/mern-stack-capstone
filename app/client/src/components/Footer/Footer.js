import React from "react";
import { Link, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const {
    breakpoints,
    palette: { secondary },
  } = theme;
  return {
    root: {
      display: "flex",
      margin: "auto",
      width: "90vw",
      borderTop: `2px solid ${secondary.light}`,
      paddingBottom: "5vh",
      [breakpoints.up("lg")]: {
        width: "80vw",
      },
    },
    footerContainer: {
      display: "flex",
      flexDirection: "column",
      margin: "0 1rem",
    },
    contactList: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
    },
    addressList: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
    },
    socialsLinks: {
      color: secondary.main,
    },
  };
});

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.footerContainer}>
        <h3>Catalog Music</h3>
        <ul className={classes.contactList}>
          <li>email: hey@catalogmusic.com</li>
          <li>
            <h4>Store Address</h4>
            <ul className={classes.addressList}>
              <li>74 Wickham Street</li>
              <li>Fortitude Valley</li>
              <li>QLD 4006</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className={classes.footerContainer}>
        <h3>Socials</h3>
        <Link className={classes.socialsLinks}>Instagram</Link>
        <Link className={classes.socialsLinks}>Facebook</Link>
      </div>
    </div>
  );
}
