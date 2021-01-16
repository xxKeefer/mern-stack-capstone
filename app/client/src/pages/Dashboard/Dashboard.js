import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import AddRecords from "./AddRecords";
import AddBlog from "./AddBlog";
import useStyles from "./DashboardStyles";

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
        </List>
        <main className={classes.componentContainer}>
          {component === "addRecords" && <AddRecords />}
          {component === "newBlog" && <AddBlog />}
        </main>
      </div>
    </div>
  );
}
