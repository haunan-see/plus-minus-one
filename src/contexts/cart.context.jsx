import { createContext, useState, useEffect } from "react";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartItemsCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartTotalPrice, setCartTotal] = useState(0);

  const addItemToCart = (itemToAdd) => {
    setCartItems(addItem(itemToAdd, cartItems));
  };

  const removeItemFromCart = (itemToRemove) => {
    setCartItems(removeItem(itemToRemove, cartItems));
  };

  const deleteItemFromCart = (itemToDelete) => {
    setCartItems(deleteItem(itemToDelete, cartItems));
  };

  useEffect(() => {
    const cartItemsCount = cartItems.reduce(
      (totalCount, cartItem) => totalCount + cartItem.quantity,
      0
    );
    setCartItemsCount(cartItemsCount);
  }, [cartItems]);

  useEffect(() => {
    const cartTotalPrice = cartItems.reduce(
      (totalPrice, cartItem) => totalPrice + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(cartTotalPrice);
  }, [cartItems]);

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
