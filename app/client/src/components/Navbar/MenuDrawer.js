// extend search bar down as much as possible

import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core";
import SearchField from "./SearchField";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ToolBarDrawer from "./ToolBarDrawer";

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
    searchListItem: {
      padding: 0,
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      margin: "2rem 0px 1rem 0px",
    },
    paper: {
      height: "100vh",
      width: "100vw",
      backgroundColor: secondary.main,
      color: primary.main,
    },
    listItems: {
      height: "4rem",
    },
    listItemText: {
      fontSize: "2rem",
    },
    genresItemText: {
      marginLeft: "5rem",
    },
    divider: {
      width: "90vw",
      margin: "1rem auto 0px auto",
      background: primary.main,
    },
    toolBarContainer: {
      borderBottom: `3px solid ${primary.main}`,
      boxShadow: `0px 3px 2px -2px ${primary.main}`,
      width: "90vw",
      margin: "auto",
      padding: "0px",
    },
    genresChevron: {
      fontSize: "1.5rem",
      marginRight: "2rem",
    },
  };
});

export default function MenuDrawer() {
  const [isOpen, setOpen] = useState(false);
  const classes = useStyles();

  const handleClick = (state) => {
    setOpen(state);
  };

  const [genresOpen, setGenresOpen] = useState(false);

  const menuItems = [
    "my account",
    "new vinyl",
    "genres",
    "news",
    "staff picks",
    "contact",
  ];
  const genresArray = [
    "techno",
    "house",
    "bass",
    "disco",
    "jazz",
    "acid",
    "trance",
    "footwork",
  ];

  const genresListItem = function (item, genres) {
    return (
      <React.Fragment>
        <ListItem
          key={item}
          button
          primary={`${item}`}
          onClick={() => setGenresOpen(!genresOpen)}
        >
          <ListItemText
            inset={true}
            primary="genres"
            classes={{ primary: classes.listItemText }}
          />
          {genresOpen ? (
            <ExpandLess className={classes.genresChevron} />
          ) : (
            <ExpandMore className={classes.genresChevron} />
          )}
        </ListItem>
        <Collapse in={genresOpen} timeout="auto" unmountOnExit>
          <List>
            {genres.map((genre) => {
              return (
                <ListItem
                  button
                  key={genre}
                  classes={{ primary: classes.genreItems }}
                >
                  <ListItemText
                    primary={`${genre}`}
                    classes={{ primary: classes.genresItemText }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
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
        anchor="left"
        open={isOpen}
        classes={{ paper: classes.paper }}
      >
        <List style={{ padding: "0px" }}>
          <ListItem className={classes.toolBarContainer} key="toolBarContainer">
            <ToolBarDrawer
              state={isOpen}
              handleClick={(e) => {
                handleClick(e);
              }}
            />
          </ListItem>
          <ListItem
            className={classes.searchListItem}
            alignItems="center"
            key="searchListItem"
          >
            <SearchField />
          </ListItem>

          {menuItems.map((item) => {
            return item === "genres" ? (
              genresListItem(item, genresArray)
            ) : (
              <ListItem key={item} button className={classes.listItems}>
                <ListItemText
                  inset={true}
                  primary={`${item}`}
                  classes={{ primary: classes.listItemText }}
                />
              </ListItem>
            );
          })}
          <Divider className={classes.divider} classes={classes.light} />
          <ListItem>
            <ListItemText inset={true}>catalog music 2020</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
