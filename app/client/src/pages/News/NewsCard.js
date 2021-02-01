import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./NewsStyles";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useGlobal } from "../../context/GlobalState";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const getDate = (date) => {
  const formattedDate = date.slice(0, 10).split("-").reverse().join("-");
  return formattedDate;
};

export default function NewsCard(props) {
  const classes = useStyles();
  const { post } = props;
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
    <React.Fragment>
      {editRedirect && <Redirect to="/dashboard" />}
      <Grid item xs={12}>
        <Card className={classes.newsCard}>
          <CardContent
            className={classes.newsCardContent}
            style={{ backgroundImage: `url(${post.image_url})` }}
          >
            <h1 className={classes.cardTitle}>{post.title}</h1>
            <h6 className={classes.cardDate}>{getDate(post.created_at)}</h6>
            <h5 className={classes.cardByline}>{post.byline}</h5>
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
          </CardContent>

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
        </Card>
      </Grid>
    </React.Fragment>
  );
}
