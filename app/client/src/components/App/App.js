import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import Navbar from "../Navbar/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import MainContainer from "../MainContainer/MainContainer";
import Home from "../../pages/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "../../pages/SignUp/SignUp";
import Cart from "../../pages/Cart/Cart";

const App = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <MainContainer>
          <Router>
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/cart" component={Cart} />
              <Route exact path="/" component={Home} />
            </Switch>
          </Router>
        </MainContainer>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
