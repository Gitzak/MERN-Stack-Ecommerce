import { createContext, useContext, useEffect, useState } from "react";
export const CartContext = createContext();

const addCartItem = (cartItems, productToAdd) => {
  const foundedItem = cartItems.find(
    (cartItem) => productToAdd._id === cartItem._id
  );

  if (foundedItem) {
    return cartItems.map((cartItem) =>
      cartItem._id === productToAdd._id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const decreaseQuantity = (cartItems, itemToDecrease) => {
  const foundedItem = cartItems.find(
    (cartItem) => itemToDecrease._id === cartItem._id
  );

  if (foundedItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem._id !== itemToDecrease._id);
  }

  return cartItems.map((cartItem) =>
    cartItem._id === itemToDecrease._id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, productToClear) =>
  cartItems.filter((cartItem) => cartItem._id !== productToClear._id);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce((total, cartItem) => total+ cartItem.quantity, 0);

    setCartItemCount(count)
}, [cartItems])

  useEffect(() => {
    const total = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(total);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const decreaseItemQuantity = (itemToDecrease) => {
    setCartItems(decreaseQuantity(cartItems, itemToDecrease));
  };

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    decreaseItemQuantity,
    clearItemFromCart,
    cartTotal,
    cartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const CartC = () => {
  const Context = useContext(CartContext);
  if (!Context) {
    throw new Error("no context provided");
  }
  return Context;
};
