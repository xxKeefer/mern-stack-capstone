import React, { useContext, useState } from "react";
import CartContext from "./CartContext";
import { API } from "../util/fetch";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const GlobalStateContext = React.createContext();

export const useGlobal = () => {
  return useContext(GlobalStateContext);
};

const GlobalState = ({ children }) => {
  const [loginModalState, setLoginModalState] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const [editRecordId, setEditRecordId] = useState(null);
  const [editBlogId, setEditBlogId] = useState(null);
  const [dashComponent, setDashComponent] = useState("addRecord");

  const fetchNewReleases = async () => {
    const promise = await API.get("/records/year/2012");
    return promise;
  };

  return (
    <GlobalStateContext.Provider
      value={{
        loginModalState,
        setLoginModalState,
        fetchNewReleases,
        searchQuery,
        setSearchQuery,
        dashComponent,
        setDashComponent,
        editRecordId,
        setEditRecordId,
        editBlogId,
        setEditBlogId,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <CartContext>{children}</CartContext>
      </QueryClientProvider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalState;
