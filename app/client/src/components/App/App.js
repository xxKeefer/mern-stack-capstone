import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import MainContainer from "../MainContainer/MainContainer";
import Home from "../../pages/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SignUp from "../../pages/SignUp/SignUp";
import Cart from "../../pages/Cart/Cart";
import Footer from "../Footer/Footer";
import News from "../../pages/News/News";
import Dashboard from "../../pages/Dashboard/Dashboard";
import GlobalState from "../../context/GlobalState";
import Genres from "../../pages/Genres/Genres";
import { useAuth } from "../../context/AuthContext";
import Account from "../../pages/Account/Account";
import SearchResults from "../../pages/SearchResults/SearchResults";
import Labels from "../../pages/Labels/Labels";

const App = () => {
  const auth = useAuth();

  useEffect(() => {
    if (auth.authState === null) {
      auth
        .fetchSessionUser()
        .then((resp) => {
          auth.setAuthState(resp);
        })
        .catch((error) => console.log(error));
    }
  }, [auth]);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <GlobalState>
          <CssBaseline />
          <Router>
            <Navbar />
            <Switch>
              <MainContainer>
                <Route path="/signup" component={SignUp} />
                <Route path="/cart" component={Cart} />
                <Route path="/labels" component={Labels} />
                <Route path="/news" component={News} />
                <Route path="/genres" component={Genres} />
                <Route path="/account" component={Account} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/results" component={SearchResults} />
                <Route exact path="/" component={Home} />
              </MainContainer>
            </Switch>
          </Router>
          <Footer />
        </GlobalState>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
