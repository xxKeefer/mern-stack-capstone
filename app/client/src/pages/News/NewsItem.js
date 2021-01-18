import React, { useState } from "react";
import { Box, Chip, Grid, makeStyles, Paper } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import useStyles from "./NewsStyles";
import { useGlobal } from "../../context/GlobalState";
import { useAuth } from "../../context/AuthContext";

export default function NewsHero(props) {
  const { post } = props;
  const classes = useStyles();
  const auth = useAuth();
  const globe = useGlobal();
  const { setEditBlogId, setDashComponent } = globe;
  const [editRedirect, setEditRedirect] = useState(false);

  const getDate = (date) => {
    const formattedDate = date.slice(0, 10).split("-").reverse().join("-");
    return formattedDate;
  };

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
        backgroundImage: "url(https://source.unsplash.com/random/800x600)",
      }}
    >
      {editRedirect && <Redirect to="/dashboard" />}

      {/* Material UI says it increases the priority of the hero background image */}
      {
        <img
          style={{ display: "none" }}
          src={post.image_url}
          alt={post.title}
        />
      }
      <Link to={`./blog/${post._id}`} className={classes.continueReading}>
        <Box width={1} height={1} className={classes.heroPost}>
          <h1 className={classes.heroTitle}>{post.title}</h1>
          <h5 className={classes.heroDate}>{getDate(post.created_at)}</h5>
          <h3 className={classes.heroByline}>{post.byline}</h3>
        </Box>
      </Link>
      {isSuper && (
        <Chip
          size="small"
          label="edit"
          className={classes.editChip}
          onClick={() => handleEdit()}
        />
      )}
    </Paper>
  );
}
