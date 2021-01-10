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
    const { currentUserId } = await publicFetch("/api/currentuser/session");
    return currentUserId;
  };

  const isAuthenticated = () => {
    console.log("functioning");
    return null;
    // return authState === currentSessionId()
    //   ? console.log("authenticated")
    //   : console.log("not authenticated");
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        isAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
