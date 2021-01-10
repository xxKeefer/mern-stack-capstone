import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import MainContainer from "../MainContainer/MainContainer";
import Home from "../../pages/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SignUp from "../../pages/SignUp/SignUp";
import Cart from "../../pages/Cart/Cart";
import Contact from "../../pages/Contact/Contact";
import Footer from "../Footer/Footer";
import News from "../../pages/News/News";
import Dashboard from "../../pages/Dashboard/Dashboard";
import GlobalState from "../../context/GlobalState";
import Genres from "../../pages/Genres/Genres";
import { AuthProvider } from "../../context/AuthContext";

const App = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <GlobalState>
          <AuthProvider>
            <CssBaseline />
            <Router>
              <Navbar />
              <Switch>
                <MainContainer>
                  <Route path="/signup" component={SignUp} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/news" component={News} />
                  <Route path="/genres" component={Genres} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route exact path="/" component={Home} />
                </MainContainer>
              </Switch>
            </Router>
            <Footer />
          </AuthProvider>
        </GlobalState>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
