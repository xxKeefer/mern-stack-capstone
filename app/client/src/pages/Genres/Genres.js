import React, { useEffect, useState } from "react";
import { makeStyles, Paper } from "@material-ui/core";
import { API } from "../../util/fetch";
import ResultsGrid from "../../components/ResultsGrid/ResultsGrid";
import TitleBar from "../../components/TitleBar/TitleBar";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

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
    linkComponent: {
      textDecoration: "none",
    },
  };
});

export default function Genres() {
  const classes = useStyles();
  const [genresList, setGenresList] = useState([]);
  const [genre, setGenre] = useState("");
  const [records, setRecords] = useState([]);
  const [genreStatus, setGenreStatus] = useState("loading");

  useEffect(() => {
    const getGenres = async () => {
      try {
        const { data } = await API.get("/records/search");
        const genresGrep = data.filter((obj) => {
          return obj.group === "Styles";
        });
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
        try {
          const { data } = await API.get(`/records/styles/${cleanedGenre}`);
          if (data.length > 0) {
            setRecords(data);
          }
          setGenreStatus("success");
        } catch (error) {
          setGenreStatus("error");
        }
      };
      getRecords();
    }
  }, [genre]);

  const { data: electronic, status: electronicStatus } = useQuery(
    "electronic",
    async () => {
      const { data } = await API.get("/records/styles/techno");
      return data;
    }
  );

  return (
    <div className={classes.genresContainer}>
      <Link to="/genres" className={classes.linkComponent}>
        <h1 className={classes.pageTitle}>genres</h1>
      </Link>
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
          <ResultsGrid query={records} status={genreStatus} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <TitleBar title="electronic" />
          <ResultsGrid query={electronic} status={electronicStatus} />
        </React.Fragment>
      )}
    </div>
  );
}
