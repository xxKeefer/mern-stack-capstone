import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
import Navbar from "../Navbar/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
    </ThemeProvider>
  );
};

export default App;
