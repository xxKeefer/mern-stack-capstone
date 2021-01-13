export const ACTIONS = {
  ADD_RECORD: "add-record",
  REMOVE_RECORD: "remove-record",
};

export default function cartReducer(cartState, action) {
  switch (action.type) {
    case ACTIONS.ADD_RECORD: {
      const updatedCart = [...cartState.cart];

      const record = action.payload;
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
      return { ...cartState, cart: updatedCart };
    }
    case ACTIONS.REMOVE_RECORD: {
      const updatedCart = [...cartState.cart];
      const record = action.payload;
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

      return { ...cartState, cart: updatedCart };
    }

    default:
      return cartState;
  }
}
