export const ACTIONS = {
  ADD_RECORD: "add-record",
  REMOVE_RECORD: "remove-record",
  SET_CUSTOMER: "set-customer",
  UNSET_CUSTOMER: "unset-customer",
  SET_ORDER: "set-order",
  UNSET_ORDER: "unset-order",
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

    case ACTIONS.SET_CUSTOMER: {
      return { ...cartState, customer: action.payload };
    }

    case ACTIONS.UNSET_CUSTOMER: {
      return { ...cartState, customer: null };
    }

    case ACTIONS.SET_ORDER: {
      return { ...cartState, order: action.payload };
    }

    case ACTIONS.UNSET_ORDER: {
      return { ...cartState, order: null };
    }

    default:
      return cartState;
  }
}
