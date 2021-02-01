import { Button } from "@material-ui/core";
import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Account() {
  const auth = useAuth();

  const handleLogout = () => {
    auth.logUserOut();
  };

  return (
    <div>
      <Button onClick={handleLogout}>logout</Button>
      {!auth.isAuthenticated() && <Redirect to="/" />}
    </div>
  );
}
