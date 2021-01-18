import React, { useState } from "react";
import { Box, CardActions, Chip, IconButton, Paper } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import useStyles from "./NewsStyles";
import { useGlobal } from "../../context/GlobalState";
import { useAuth } from "../../context/AuthContext";
import { getDate, handleEdit } from "./newsHelpers";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

export default function NewsHero(props) {
  const { post } = props;
  const classes = useStyles();
  const auth = useAuth();
  const globe = useGlobal();
  const { setEditBlogId, setDashComponent } = globe;
  const [editRedirect, setEditRedirect] = useState(false);
  const [showBody, setShowBody] = useState(false);

  const handleEdit = () => {
    setDashComponent("editBlog");
    setEditRedirect(true);
    setEditBlogId(post._id);
  };
  const { isSuper } = auth;

  return (
    <Paper
      className={classes.imageContainer}
      style={{
        backgroundImage: `url(${post.image_url})`,
      }}
    >
      {editRedirect && <Redirect to="/dashboard" />}

      <Box width={1} height={1} className={classes.heroPost}>
        <h1 className={classes.heroTitle}>{post.title}</h1>
        <h5 className={classes.heroDate}>{getDate(post.created_at)}</h5>
        <h3 className={classes.heroByline}>{post.byline}</h3>
      </Box>
      <CardActions className={classes.cardActionsContainer}>
        {!showBody && (
          <IconButton
            className={classes.moreIconContainer}
            onClick={() => setShowBody(true)}
          >
            <ExpandMoreIcon size="large" color="secondary" />
          </IconButton>
        )}
        {isSuper() && (
          <Chip
            size="small"
            label="edit"
            className={classes.editChip}
            onClick={() => handleEdit()}
          />
        )}
      </CardActions>
      {showBody && (
        <div className={classes.bodyContainer}>
          <p className={classes.cardBody}>{post.body}</p>
          <IconButton
            className={classes.lessIconContainer}
            onClick={() => setShowBody(false)}
          >
            <ExpandLessIcon size="large" color="primary" />
          </IconButton>
        </div>
      )}
    </Paper>
  );
}
