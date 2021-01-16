import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import AddRecords from "./AddRecords";
import AddBlog from "./AddBlog";

const useStyles = makeStyles((theme) => {
  const {
    palette: { fluro, primary, secondary },
    breakpoints,
  } = theme;
  return {
    dashboardContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
    },
    formContainer: {
      border: "2px solid black",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    formInput: {
      fontSize: "1rem",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      margin: "1rem",
    },
    submitButton: {
      border: "1px solid black",
      margin: "0rem 1rem 1rem",
      color: secondary.main,
      padding: "0.5rem 1rem",
      backgroundColor: primary.main,
      fontSize: "1rem",
    },
    formLabel: { fontSize: "1rem", color: secondary.main },
    errorMessage: { color: "#ed2e38" },
    formTitle: {},
    successfulSubmit: {
      padding: "0.5rem",
      backgroundColor: fluro.main,
      color: secondary.main,
      borderRadius: "5px",
      margin: "auto",
      textAlign: "center",
      fontSize: "0.8rem",
    },
  };
});

export default function Dashboard() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState("");

  return (
    <div>
      <div className={classes.dashboardContainer}>
        <List style={{ border: "2px solid black" }}>
          <ListItem button onClick={() => setComponent("addRecords")}>
            <ListItemText primary="Add Records" />
          </ListItem>
          <ListItem button onClick={() => setComponent("newBlog")}>
            <ListItemText primary="New Blog" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Other thingy" />
          </ListItem>
        </List>
        <main
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            border: "2px solid red",
          }}
        >
          {component === "addRecords" && <AddRecords />}
          {component === "newBlog" && <AddBlog />}
        </main>
      </div>
    </div>
  );
}
