import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";
import { v4 as uuidv4 } from "uuid";

/// ADD Function Helper
const addToCartHandler = (cartItems, product) => {
  // for non variant products
  const cartItem = cartItems.filter((item) => item._id === product._id)[0];
  if (cartItem === undefined) {
    return [
      ...cartItems,
      {
        ...product,
        quantityCount: product.quantityCount ? product.quantityCount : 1,
        cartItemId: uuidv4(),
      },
    ];
  } else {
    return cartItems.map((item) =>
      item.cartItemId === cartItem.cartItemId
        ? {
            ...item,
            quantityCount: product.quantityCount
              ? item.quantityCount + product.quantityCount
              : item.quantity + 1,
          }
        : item
    );
  }
};

/// Decrease Function Helper
const increaseQuantityHandler = (cartItems, product) => {
  return cartItems.map((item) =>
    item.cartItemId === product.cartItemId
      ? { ...item, quantityCount: item.quantityCount + 1 }
      : item
  );
};

/// Decrease Function Helper
const decreaseQuantityHandler = (cartItems, product) => {
  if (product.quantityCount === 1) {
    const remainingItems = (cartItems, product) =>
      cartItems.filter(
        (cartItem) => cartItem.cartItemId !== product.cartItemId
      );
    return remainingItems(cartItems, product);
  } else {
    return cartItems.map((item) =>
      item.cartItemId === product.cartItemId
        ? { ...item, quantityCount: item.quantityCount - 1 }
        : item
    );
  }
};

/// Delete Function Helper
const deleteFromCartHandler = (cartItems, product) => {
  const remainingItems = (cartItems, product) =>
    cartItems.filter((cartItem) => cartItem.cartItemId !== product.cartItemId);
  return remainingItems(cartItems, product);
};

/// Delete Function Helper
const deleteAllFromCartHandler = (cartItems) => {
  return cartItems.filter((item) => {
    return false;
  });
};

//add to cart
export const addToCart = (cartItems, product) => {
  const newCartItems = addToCartHandler(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

//decrease from cart
export const increaseQuantity = (cartItems, product) => {
  const newCartItems = increaseQuantityHandler(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

//decrease from cart
export const decreaseQuantity = (cartItems, product) => {
  const newCartItems = decreaseQuantityHandler(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
//delete from cart
export const deleteFromCart = (cartItems, product) => {
  const newCartItems = deleteFromCartHandler(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const deleteAllFromCart = (cartItems) => {
  const newCartItems = deleteAllFromCartHandler(cartItems);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
