import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import Navbar from "../Navbar/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import MainContainer from "../MainContainer/MainContainer";
import Home from "../../pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginModal from "../LoginModal/LoginModal";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <MainContainer>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LoginModal} />
          </Switch>
        </Router>
      </MainContainer>
    </ThemeProvider>
  );
};

export default App;
