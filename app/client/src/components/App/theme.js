import { createMuiTheme } from "@material-ui/core/styles";

import Coolvetica from "../../fonts/coolvetica-rg.ttf";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#EEE",
    },
    primary: {
      main: "#EEE",
    },
    secondary: {
      main: "#2D2926",
    },
    fluro: {
      main: "#EdFF00",
    },
    light: {
      main: "#BAA99C",
    },
    text: {
      primary: "#2D2926",
      gray: "#808080",
    },
    red: {
      main: "#ed2e38",
    },
  },
  typography: {
    fontFamilyCoolvetica: "Coolvetica, Arial",
  },
});

export default theme;
