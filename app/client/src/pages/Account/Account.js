import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import ButtonMain from "../../components/ButtonMain/ButtonMain";
import ShippingDetails from "../Cart/ShippingDetails";
import AccountDetails from "./AccountDetails";

const useStyles = makeStyles((theme) => {
  const {
    palette: { red, primary },
  } = theme;
  return {
    accountsContainer: {
      width: "100%",
      height: "100%",
      backgroundColor: primary.main,
      display: "flex",
    },
  };
});

export default function Account() {
  const auth = useAuth();
  const classes = useStyles();
  const theme = useTheme();
  const [accountComponent, setAccountComponent] = useState("");

  const {
    palette: { red },
  } = theme;

  const handleLogout = () => {
    auth.logUserOut();
  };

  return (
    <div className={classes.accountsContainer}>
      <h1 style={{ padding: "1rem" }}>your account</h1>
      <List style={{ margin: "1rem", borderRight: "2px solid black" }}>
        <ListItem button onClick={() => setAccountComponent("accountDetails")}>
          <ListItemText primary="account details" />
        </ListItem>
        <ListItem button onClick={() => setAccountComponent("newBlog")}>
          <ListItemText primary="shipping details" />
        </ListItem>
      </List>
      <div>
        {accountComponent === "accountDetails" && <AccountDetails />}
        {accountComponent === "shippingDetails" && <ShippingDetails />}
      </div>
      <ButtonMain color={red.main} handleClick={handleLogout}>
        logout
      </ButtonMain>
      {!auth.isAuthenticated() && <Redirect to="/" />}
    </div>
  );
}
