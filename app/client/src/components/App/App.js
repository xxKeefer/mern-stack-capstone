import React, { useContext, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import MainContainer from "../MainContainer/MainContainer";
import Home from "../../pages/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SignUp from "../../pages/SignUp/SignUp";
import Cart from "../../pages/Cart/Cart";
import Checkout from "../../pages/Checkout/Checkout";
import Contact from "../../pages/Contact/Contact";
import Footer from "../Footer/Footer";
import News from "../../pages/News/News";
import Dashboard from "../../pages/Dashboard/Dashboard";
import { GlobalState } from "../../context/GlobalState";
import Genres from "../../pages/Genres/Genres";
import { AuthContext } from "../../context/AuthContext";
import { API } from "../../util/fetch";
import Account from "../../pages/Account/Account";

const App = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.authState === null) {
      authContext
        .fetchSessionUser()
        .then((resp) => {
          authContext.setAuthState(resp);
        })
        .catch((error) => console.log(error));
    }
  }, [authContext]);

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
                <Route path="/contact" component={Contact} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/news" component={News} />
                <Route path="/genres" component={Genres} />
                <Route path="/account" component={Account} />
                <Route path="/dashboard" component={Dashboard} />
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
