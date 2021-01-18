import React from "react";
import { Divider, Grid, makeStyles } from "@material-ui/core";
import NewsHero from "./NewsHero";
import { useQuery } from "react-query";
import { API } from "../../util/fetch";
import NewsCard from "./NewsCard";

const useStyles = makeStyles((theme) => {
  const {
    palette: { light, secondary },
  } = theme;

  return {
    newsContainer: {
      width: "100%",
      paddingBottom: "5vh",
    },
    pageTitle: {
      color: secondary.main,
      margin: "1rem",
    },
  };
});

export default function News() {
  const classes = useStyles();

  const { data: blogPosts, status: blogPostStatus } = useQuery(
    "blogPosts",
    async () => {
      const { data } = await API.get("/blog/posts");
      return data;
    }
  );
  return (
    <div className={classes.newsContainer}>
      <h1 className={classes.pageTitle}>news</h1>
      {blogPostStatus === "success" && (
        <React.Fragment>
          <NewsHero post={blogPosts[0]}></NewsHero>
          <Divider style={{ margin: "2rem" }} />
          <Grid container spacing={2} style={{ paddingTop: "1rem" }}>
            {blogPosts.map((post, index) => {
              return index === 0 ? null : <NewsCard post={post} />;
            })}
          </Grid>
        </React.Fragment>
      )}
    </div>
  );
}
