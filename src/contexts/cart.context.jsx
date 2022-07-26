import { createContext, useState, useReducer } from "react";
import { createAction } from "../utilities/reducer/reducer.utilities";

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

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_COUNT: "SET_CART_COUNT",
  SET_CART_TOTAL: "SET_CART_TOTAL",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartItemsCount: 0,
  cartTotalPrice: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unidentified CART_ACTION_TYPES: ${type}`);
  }
};

const deleteItem = (itemToDelete, cartItems) =>
  cartItems.filter((cartItem) => cartItem.id !== itemToDelete.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartItemsCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [{ cartItemsCount, cartTotalPrice, cartItems }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const updateCartItemsReducer = (cartItems) => {
    const newcartItemsCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newcartTotalPrice = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    const payload = {
      cartItems,
      cartItemsCount: newcartItemsCount,
      cartTotalPrice: newcartTotalPrice,
    };

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
  };

  const addItemToCart = (itemToAdd) => {
    const newCartItems = addItem(itemToAdd, cartItems);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (itemToRemove) => {
    const newCartItems = removeItem(itemToRemove, cartItems);
    updateCartItemsReducer(newCartItems);
  };

  const deleteItemFromCart = (itemToDelete) => {
    const newCartItems = deleteItem(itemToDelete, cartItems);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    cartItemsCount,
    cartTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
