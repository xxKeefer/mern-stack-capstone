import { createMuiTheme } from "@material-ui/core/styles";

import Coolvetica from "../../fonts/coolvetica-rg.ttf";

const coolvetica = {
  fontFamily: "Coolvetica",
  fontStyle: "regular",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
    local('Coolvetica'),
    local('Coolvetica-Regular'),
    url(${Coolvetica}) format('ttf')
  `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

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
  },
  typography: {
    fontFamilyCoolvetica: "Coolvetica, Arial",
  },
});

export default theme;
