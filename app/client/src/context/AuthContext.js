import React, { useState, createContext } from "react";
import { publicFetch } from "../util/fetch";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState("");

  const setAuthInfo = ({ _id }) => {
    // localStorage.setItem("currentUser", _id);
    setAuthState(_id);
    console.log(_id);
  };

  const currentSessionId = async () => {
    const { _id: currentUserId } = await publicFetch("/api/auth/session");
    return currentUserId;
  };

  const isAuthenticated = () => {
    return authState === currentSessionId()
      ? console.log("authenticated")
      : console.log("not authenticated");
  };
  const test = "test";

  const value = {
    authState,
    setAuthState: (authInfo) => setAuthInfo(authInfo),
    isAuthenticated,
    test,
  };

  return <Provider value={value}>{children}</Provider>;
};

export { AuthContext, AuthProvider };
