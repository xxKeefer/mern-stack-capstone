import React, { useState, createContext } from "react";
import axios from "axios";
import { publicFetch } from "../../util/fetch";

const AuthContext = createContext();
const { Provider } = AuthContext;
i;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ userInfo: {} });

  const setAuthInfo = ({ _id }) => {
    // localStorage.setItem("currentUser", _id);
    setAuthState(_id);
    console.log(_id);
  };

  const isAuthenticated = () => {
    if (authState === currentSessionId()) {
      console.log("authenticated");
    }
  };

  const currentSessionId = async () => {
    const { currentUserId } = await publicFetch("/api/currentuser/session");
    return currentUserId;
  };

  return (
    <Provider
      value={{ authState, setAuthState: (authInfo) => setAuthInfo(authInfo) }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
