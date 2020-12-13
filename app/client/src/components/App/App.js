import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import Navbar from "../Navbar/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuDrawer from "../Navbar/MenuDrawer";
import Paper from "../Paper/Paper";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Paper />
    </ThemeProvider>
  );
};

export default App;
