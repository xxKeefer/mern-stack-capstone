import React, { useEffect, useState } from "react";
import { makeStyles, Paper } from "@material-ui/core";
import { API } from "../../util/fetch";
import Results from "../../components/ResultsGrid/ResultsGrid";
import TitleBar from "../../components/TitleBar/TitleBar";

const useStyles = makeStyles((theme) => {
  const {
    palette: { primary, secondary },
  } = theme;
  return {
    genresContainer: {
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
  };
});

export default function Genres() {
  const classes = useStyles();
  const [genresList, setGenresList] = useState([]);
  const [genre, setGenre] = useState("");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const { data } = await API.get("/records/search");
        const genresGrep = data.filter((obj) => {
          return obj.group === "Genres";
        });
        console.log(genresGrep);
        setGenresList(genresGrep);
      } catch (error) {
        console.log(error);
      }
    };
    getGenres();
  }, []);

  useEffect(() => {
    if (genre !== "") {
      const getRecords = async () => {
        const cleanedGenre = genre.toLowerCase();
        console.log(cleanedGenre);

        const { data } = await API.get(`/records/genres/${cleanedGenre}`);
        console.log(data);
        if (data.length > 0) {
          setRecords(data);
        }
      };
      getRecords();
    }
  }, [genre]);

  return (
    <div className={classes.genresContainer}>
      <h1 className={classes.pageTitle}>genres</h1>
      <Paper className={classes.genresListContainer}>
        <ul className={classes.genresList}>
          {genresList.map((genre) => {
            return (
              <li
                className={classes.genreListItem}
                onClick={() => setGenre(genre.title)}
              >
                {genre.title}
              </li>
            );
          })}
        </ul>
      </Paper>
      {genre ? (
        <React.Fragment>
          <TitleBar title={genre} />
          <Results records={records} />
        </React.Fragment>
      ) : (
        <TitleBar title="techno" />
      )}
    </div>
  );
}
