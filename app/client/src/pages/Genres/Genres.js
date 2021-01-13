import React, { useEffect, useState } from "react";
import { makeStyles, Paper } from "@material-ui/core";
import { API } from "../../util/fetch";
import { useQuery } from "react-query";
import RecordCard from "../../components/RecordCard/RecordCard";

const useStyles = makeStyles((theme) => {
  const {
    palette: { primary, secondary },
  } = theme;
  return {
    genresContainer: {
      backgroundColor: secondary.main,
      width: "100%",
      height: "100%",
      padding: "1rem",
    },
    genresListContainer: {
      width: "100%",
      backgroundColor: primary.main,
      borderRadius: 0,
      padding: "1rem",
    },
    genresList: {
      // display: "flex",
      // flexDirection: "column",
      // height: "100%",
      // flexWrap: "wrap",
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
      color: primary.main,
      marginTop: 0,
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

  const testGenres = [
    "afro",
    "ambient ",
    "bass ",
    "beats",
    "blues",
    "Boogie",
    "breakbeat ",
    "broken beats",
    "Classical",
    "drum and bass",
    "Dub",
    "dubstep",
    "electronic ",
    "experiental",
    "folk",
    "Funk ",
    "fusion",
    "grime",
    "hip hop",
    "house",
    "indie",
    "jazz",
    "jungle",
    "kraut ",
    "latin",
    "library",
    "metal",
    "modern soul",
    "new wave",
    "nujazz",
    "prog ",
    "psyche",
    "punk ",
    "Reggae",
    "RnB",
    "rock",
    "Soul ",
    "soundtracks ",
    "Special effects",
    "spoken word",
    "synth",
    "techno",
    "world",
  ];

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
          {/*           
           {testGenres.map((genre) => { 
          //   return (
          //     <li
          //       className={classes.genreListItem}
          //       onClick={() => setGenre(genre)}
          //     >
          //       {genre}
          //     </li>
          //   );
          // })} */}
        </ul>
      </Paper>
      {records.length > 0 &&
        records.map((record) => {
          return <RecordCard record={record}></RecordCard>;
        })}
    </div>
  );
}
