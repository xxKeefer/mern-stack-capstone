import React from "react";
import { Box, Grid, makeStyles, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./NewsStyles";

const getDate = (date) => {
  const formattedDate = date.slice(0, 10).split("-").reverse().join("-");
  console.log(formattedDate);
  return formattedDate;
};

export default function NewsHero(props) {
  const { post } = props;

  const classes = useStyles();
  return (
    <Paper
      className={classes.imageContainer}
      style={{
        backgroundImage: "url(https://source.unsplash.com/random/800x600)",
      }}
    >
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
    </Paper>
  );
}
