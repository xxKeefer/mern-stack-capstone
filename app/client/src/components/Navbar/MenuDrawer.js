import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core";
import SearchField from "./SearchField";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => {
  const {
    palette: { primary, secondary },
  } = theme;

  return {
    root: { backgroundColor: secondary.main },
    menuIcon: {
      fontSize: "2.5rem",
      color: secondary.main,
    },
    closeListItem: {
      height: "6.5vh",
    },
    closeIcon: {
      fontSize: "2.5rem",
      color: primary.main,
      marginLeft: "5vw",
    },
    paper: {
      height: "100vh",
      width: "100vw",
      backgroundColor: secondary.main,
      color: primary.main,
    },
    listItems: {
      height: "4rem",
      padding: 0,
    },
    listItemText: {
      fontSize: "3rem",
      padding: "1rem",
    },
  };
});

export default function MenuDrawer({ openState }) {
  const [isOpen, setOpen] = useState(false);
  const classes = useStyles();

  const menuItems = ["new vinyl", "genres", "news", "staff picks", "contact"];

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
        className={classes.root}
        variant="temporary"
        anchor="top"
        open={isOpen}
        classes={{ paper: classes.paper }}
        onClose={() => {
          setOpen(false);
        }}
        // ModalProps={{ onBackdropClick: closeDrawer() }}
      >
        <List>
          <ListItem className={classes.closeListItem}>
            <ListItemIcon>
              <CloseIcon
                className={classes.closeIcon}
                onClick={() => {
                  setOpen(!isOpen);
                }}
              />
            </ListItemIcon>
          </ListItem>
          <ListItem className={classes.listItems}>
            <SearchField />
          </ListItem>
          {menuItems.map((item) => {
            return (
              <ListItem button className={classes.listItems}>
                <ListItemText
                  inset="true"
                  primary={`${item}`}
                  className={classes.listItemText}
                />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}
