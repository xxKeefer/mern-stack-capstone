import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import { IconButton, List, ListItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const {
    palette: { secondary },
  } = theme;

  return {
    menuIcon: {
      fontSize: "2.5rem",
      color: secondary.main,
    },
  };
});

export default function MenuDrawer({ openState }) {
  const [isOpen, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <div>
      <IconButton
        aria-label="menu"
        edge="start"
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        <MenuIcon className={classes.menuIcon} />
      </IconButton>

      <Drawer
        variant="temporary"
        anchor="top"
        open={isOpen}
        onClose={() => {
          setOpen(false);
        }}
        // ModalProps={{ onBackdropClick: closeDrawer() }}
      >
        <List>
          <ListItem className={classes.menuItems}>new vinyl</ListItem>
          <ListItem>genres</ListItem>
          <ListItem>news</ListItem>
          <ListItem>staff picks</ListItem>
          <ListItem>contact</ListItem>
        </List>
      </Drawer>
    </div>
  );
}
