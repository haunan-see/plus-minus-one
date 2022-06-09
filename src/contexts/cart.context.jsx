import { createContext, useState, useEffect } from "react";

const addItem = (itemToAdd, cartItems) => {
  // check if itemToAdd exist in cartItems
  const isItemExist = cartItems.find(
    (cartItem) => cartItem.id === itemToAdd.id
  );

  // itemToAdd exists in cartItems
  if (isItemExist) {
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

  const addItemToCart = (itemToAdd) => {
    setCartItems(addItem(itemToAdd, cartItems));
  };

  useEffect(() => {
    const cartItemsCount = cartItems.reduce(
      (totalCount, cartItem) => totalCount + cartItem.quantity,
      0
    );
    setCartItemsCount(cartItemsCount);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartItemsCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
