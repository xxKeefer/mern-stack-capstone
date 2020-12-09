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
    topBar: {
      paddingLeft: "0.5rem",
      maxHeight: "7vh",
      width: "90vw",
      margin: "auto",
      marginBottom: "1rem",
      borderBottom: `3px solid ${primary.main}`,
      boxShadow: `0px 3px 2px -2px ${primary.main}`,
      display: "flex",
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
  };
});

export default function MenuDrawer(props) {
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
          button
          primary={`${item}`}
          onClick={() => setGenresOpen(!genresOpen)}
        >
          <ListItemText
            inset={true}
            primary="genres"
            classes={{ primary: classes.listItemText }}
          />
          {genresOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={genresOpen} timeout="auto" unmountOnExit>
          <List>
            {genres.map((genre) => {
              return (
                <ListItem button classes={{ primary: classes.genreItems }}>
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
        anchor="left"
        open={isOpen}
        transitionDuration={"10000"}
        classes={{ paper: classes.paper }}
      >
        <List style={{ padding: "0px" }}>
          <ListItem style={{ padding: "0px" }}>
            <ToolBarDrawer
              state={isOpen}
              handleClick={(e) => {
                handleClick(e);
              }}
            />
          </ListItem>
          <ListItem className={classes.searchListItem} alignItems="center">
            <SearchField />
          </ListItem>

          {menuItems.map((item) => {
            return item === "genres" ? (
              genresListItem(item, genresArray)
            ) : (
              <ListItem button className={classes.listItems}>
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
    </div>
  );
}
