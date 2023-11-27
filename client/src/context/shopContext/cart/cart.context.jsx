import { createContext, useContext, useEffect, useReducer } from "react";
import { createAction } from "./cart.action";
import {
  addCartItem,
  decreaseQuantity,
  increaseQuantity,
  clearCartItem,
  calculateCartValues,
} from "./cart.action";
import { CART_ACTION_TYPES, cartReducer } from "./cart.reducer";

export const CartContext = createContext();


export const CartProvider =  ({ children }) => {
  const storedCartItems = JSON.parse(localStorage.getItem('cartItemsStorage')) || [];
  const [{ cartItems, cartCount, cartTotal }, dispatch] = useReducer(
    cartReducer,
    {
      cartItems: storedCartItems,
      ...calculateCartValues(storedCartItems),
    }
  );
  
  // Update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cartItemsStorage', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateCartItemsReducer = (newCartItems) => {
    const { cartCount, cartTotal } = calculateCartValues(newCartItems);
    const payload = {
      cartItems: newCartItems,
      cartTotal,
      cartCount,
    };

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
  };

  const addItemToCart = (productToAdd, selectedOptions) => {
    const newCartItems = addCartItem(cartItems, productToAdd, selectedOptions);
    updateCartItemsReducer(newCartItems);
  };

  const increaseItemQuantity = (itemToIncrease) => {
    const newCartItems = increaseQuantity(cartItems, itemToIncrease);
    updateCartItemsReducer(newCartItems);
  };

  const decreaseItemQuantity = (itemToDecrease) => {
    const newCartItems = decreaseQuantity(cartItems, itemToDecrease);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    cartItems,
    addItemToCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearItemFromCart,
    cartTotal,
    cartCount,
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














 // // Load cart items from localStorage on component mount
  // useEffect(() => {
  //   const cartItemsStorage = localStorage.getItem('cartItemsStorage');
  //   if (cartItemsStorage) {
  //     return INITIAL_STATE = JSON.parse(cartItemsStorage)
  //   }
  // }, []); 