import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { makeStyles, useTheme } from "@material-ui/core";
import ButtonMain from "../../components/ButtonMain/ButtonMain";
import ShippingDetails from "../Cart/ShippingDetails";

const useStyles = makeStyles((theme) => {
  const {
    palette: { red, primary },
  } = theme;
  return {
    accountsContainer: {
      width: "100%",
      height: "100%",
      backgroundColor: primary.main,
    },
  };
});

export default function Account() {
  const auth = useAuth();
  const classes = useStyles();
  const theme = useTheme();

  const {
    palette: { red },
  } = theme;

  const handleLogout = () => {
    auth.logUserOut();
  };

  return (
    <div className={classes.accountsContainer}>
      <h1 style={{ padding: "1rem" }}>your account</h1>
      <ShippingDetails />
      <ButtonMain color={red.main} handleClick={handleLogout}>
        logout
      </ButtonMain>
      {!auth.isAuthenticated() && <Redirect to="/" />}
    </div>
  );
}
