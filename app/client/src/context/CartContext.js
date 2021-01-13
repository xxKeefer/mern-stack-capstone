import React, { useContext, useReducer } from "react";
import cartReducer from "../context/reducers/cartReducer";

const GlobalCartContext = React.createContext();

export const useCart = () => {
  return useContext(GlobalCartContext);
};

const CartContext = ({ children }) => {
  const initialCart = { cart: [], shipping: {}, customer: null };
  const [cartState, dispatch] = useReducer(cartReducer, initialCart);

  return (
    <GlobalCartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </GlobalCartContext.Provider>
  );
};
export default CartContext;
