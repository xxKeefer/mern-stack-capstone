import React, { useState, createContext } from "react";
import { publicFetch } from "../util/fetch";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({});

  const setAuthInfo = (currentUserInfo) => {
    localStorage.setItem("currentUserId", currentUserInfo._id);
    setAuthState(currentUserInfo);
  };

  const currentSessionId = async () => {
    try {
      const { _id: currentUserId } = await publicFetch("/api/auth/session");
      console.log("hit api");
      return currentUserId;
    } catch (error) {
      console.log(error);
    }
  };

  const isAuthenticated = async () => {
    const currentUserId = await currentSessionId();
    console.log(currentUserId);
    if (authState._id) console.log(authState._id);
    // return authState._id === (await currentSessionId())
    // ? console.log("authenticated")
    // : console.log("not authenticated");
  };

  const isAdmin = () => {
    return authState.roles[0] === "admin";
  };

  const isSuper = () => {
    return authState.roles[0] === "super";
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        isAuthenticated,
        isAdmin,
        isSuper,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
