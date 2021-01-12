export const ADD_RECORD = "ADD_RECORD";
export const REMOVE_RECORD = "REMOVE_RECORD";

const addToCart = (record, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.discogs_id === record.discogs_id
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...record, quantity: 1 });
    console.log("item added to cart", updatedCart.length);
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
    console.log("item count increased", updatedCart);
  }
  return { ...state, cart: updatedCart };
};

const removeFromCart = (record, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.discogs_id === record.discogs_id
  );

  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  updatedItem.quantity--;
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }

  return { ...state, cart: updatedCart };
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_RECORD:
      return addToCart(action.record, state);
    case REMOVE_RECORD:
      return removeFromCart(action.recordId, state);
    default:
      return state;
  }
};
