import React, { createContext, useReducer, useState } from "react";
import CartContext from "./CartContext";
import { cartReducer, ADD_RECORD, REMOVE_RECORD } from "./reducers";
import placeholderImage from "../images/placeholderImage.png";
import { API } from "../util/fetch";
import { useQuery } from "react-query";

const GlobalContext = createContext();

const GlobalState = ({ children }) => {
  "./api/shop/list";
  const records = [
    {
      id: 1,
      artistName: "First Artist",
      recordTitle: "First Title",
      recordPrice: 80,
      recordLabel: "First Label",
      releaseYear: "1988",
      genres: ["techno", "house"],
      coverImage: placeholderImage,
      description:
        "This is a record that has been created for whatever reason etc. If this were a long description it would be about this long.",
    },
    {
      id: 2,
      artistName: "Second Artist",
      recordTitle: "Second Title",
      recordPrice: 60,
      recordLabel: "Second Label",
      releaseYear: "1988",
      genres: ["techno", "house"],
      coverImage: placeholderImage,
      description:
        "This is a record that has been created for whatever reason etc. If this were a long description it would be about this long.",
    },
    {
      id: 3,
      artistName: "Third Artist",
      recordTitle: "Third Title",
      recordPrice: 20,
      recordLabel: "Third Label",
      releaseYear: "1988",
      genres: ["techno", "house"],
      coverImage: placeholderImage,
      description:
        "This is a record that has been created for whatever reason etc. If this were a long description it would be about this long.",
    },
    {
      id: 4,
      artistName: "Fourth Artist",
      recordTitle: "Fourth Title",
      recordPrice: 33,
      recordLabel: "Fourth Label",
      releaseYear: "1988",
      genres: ["acid", "house"],
      coverImage: placeholderImage,
      description:
        "This is a record that has been created for whatever reason etc. If this were a long description it would be about this long.",
    },
  ];
  const [cartState, dispatch] = useReducer(cartReducer, { cart: [] });

  const addToCart = (record) => {
    dispatch({ type: ADD_RECORD, record: record });
  };

  const removeFromCart = (recordId) => {
    dispatch({ type: REMOVE_RECORD, recordId: recordId });
  };

  const [modalState, setModalState] = useState(false);

  const fetchNewReleases = async () => {
    const { data } = API.get("/records/year/2020");
    console.log(data);
    return data;
  };

  return (
    <GlobalContext.Provider
      value={{
        modalState: modalState,
        setModalState: setModalState,
        fetchNewReleases: fetchNewReleases,
      }}
    >
      <CartContext.Provider
        value={{
          records: records,
          cart: cartState.cart,
          addToCart: addToCart,
          removeFromCart: removeFromCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalState };
