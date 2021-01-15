import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { API } from "../../util/fetch";
import { useQuery } from "react-query";
import { useGlobal } from "../../context/GlobalState";
import ResultsGrid from "../../components/ResultsGrid/ResultsGrid";
import TitleBar from "../../components/TitleBar/TitleBar";

const useStyles = makeStyles((theme) => {
  const {
    palette: { primary, secondary },
  } = theme;
  return {
    searchContainer: {
      backgroundColor: primary.main,
      width: "100%",
      height: "100%",
    },
    genresListContainer: {
      width: "100%",
      backgroundColor: primary.main,
      borderRadius: 0,
      padding: "1rem",
      outline: `4px double ${secondary.main}`,
      outlineOffset: "-3px",
    },
    genresList: {
      columnCount: "5",
    },
    genreListItem: {
      listStyle: "none",
      fontSize: "1.3rem",
      padding: 0,
      margin: 0,
      textTransform: "lowercase",
      cursor: "pointer",

      "&:hover": {
        fontStyle: "italic",
      },
    },
    pageTitle: {
      color: secondary.main,
      marginTop: 0,
      padding: "1rem",
    },
    linkComponent: {
      textDecoration: "none",
    },
  };
});

export default function SearchResults() {
  const classes = useStyles();
  const globe = useGlobal();
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();

  const { searchQuery } = globe;

  useEffect(() => {
    if (searchQuery) {
      if (searchQuery.group === "Titles") {
        setCategory("release_title");
      } else if (searchQuery.group === "Artists") {
        setCategory("artists_sort");
      } else {
        setCategory(searchQuery.group.replace(/\s+/g, "").toLowerCase());
      }
      setTitle(searchQuery.title.replace(/\s+/g, "").toLowerCase());
    }
  }, [searchQuery, setTitle, setCategory]);

  const { data: results, status } = useQuery(`${title}`, async () => {
    const { data } = await API.get(`/records/${category}/${title}`);
    console.log(data);
    console.log(status);
    return data;
  });

  return (
    <div className={classes.searchContainer}>
      {searchQuery ? (
        <TitleBar title={`search results: ${searchQuery.title}`} />
      ) : (
        <TitleBar title="No results... try another search." />
      )}
      {status === "loading" && <p>loading...</p>}
      {status === "success" && <ResultsGrid query={results} status={status} />}
    </div>
  );
}