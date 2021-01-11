import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Account() {
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    console.log("logginout");
    authContext.logUserOut();
  };

  return (
    <div>
      <Button onClick={handleLogout}>logout</Button>
      {!authContext.isAuthenticated() && <Redirect to="/" />}
    </div>
  );
}
