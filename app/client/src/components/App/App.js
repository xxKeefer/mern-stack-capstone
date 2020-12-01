import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import Navbar from "../Navbar/Navbar";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333",
    },
    secondary: {
      main: "#EEE",
    },
  },
});

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar></Navbar>
      </ThemeProvider>
    </div>
  );
};

export default App;
