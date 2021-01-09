import React, { useState, createContext } from "react";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ userInfo: {} });
  const setAuthInfo = ({ userInfo }) => {
    setAuthState(userInfo);
  };
  return (
    <Provider
      value={{ authState, setAuthState: (authInfo) => setAuthInfo(authInfo) }}
    >
      {children}
    </Provider>
  );
};

export {AuthContext, AuthProvider} 