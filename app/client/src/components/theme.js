import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#EEE",
    },
    primary: {
      main: "#EEE",
    },
    secondary: {
      main: "#333",
    },
  },
  breakpoints: {
    values: {
      phone: 411,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
  typography: {
    
  },
});

export default theme;
