import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utilities/reducer/reducer.utilities";

const addItem = (itemToAdd, cartItems) => {
  // check if itemToAdd exist in cartItems
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === itemToAdd.id
  );

  // itemToAdd exists in cartItems
  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  } else {
    // itemToAdd does not exist in cartItems
    return [{ ...itemToAdd, quantity: 1 }, ...cartItems];
  }
};

const removeItem = (itemToRemove, cartItems) => {
  // check if itemToRemove exist in cartItems
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === itemToRemove.id
  );

  // existingCartItem quantity has equal to 1
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
  } else {
    // existingCartItem quantity has more than to 1
    return cartItems.map((cartItem) => {
      return cartItem.id === itemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem;
    });
  }
};

const deleteItem = (itemToDelete, cartItems) =>
  cartItems.filter((cartItem) => cartItem.id !== itemToDelete.id);

export const setIsCartOpen = (bool) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
};

export const addItemToCart = (itemToAdd, cartItems) => {
  const newCartItems = addItem(itemToAdd, cartItems);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (itemToRemove, cartItems) => {
  const newCartItems = removeItem(itemToRemove, cartItems);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const deleteItemFromCart = (itemToDelete, cartItems) => {
  const newCartItems = deleteItem(itemToDelete, cartItems);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
