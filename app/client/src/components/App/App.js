import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import Navbar from "../Navbar/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import MainContainer from "../MainContainer/MainContainer";
import RecordCard from "../RecordCard/RecordCard";
import { Grid, GridList, GridListTile } from "@material-ui/core";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <MainContainer>
        <Grid container style={{ margin: "auto" }}>
          <Grid container justify="space-evenly" alignItems="center">
            <Grid item>
              <RecordCard />
            </Grid>
          </Grid>
        </Grid>
      </MainContainer>
    </ThemeProvider>
  );
};

export default App;
