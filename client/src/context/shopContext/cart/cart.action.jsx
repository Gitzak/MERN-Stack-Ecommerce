import { v4 as uuidv4 } from "uuid";

export const createAction = (type, payload) => ({ type, payload });

export const addCartItem = (cartItems, productToAdd, selectedOptions) => {
  const foundedItemIndex = cartItems.findIndex(
    (cartItem) => productToAdd._id === cartItem._id
  );

  const sortOptions = selectedOptions
    .map((option) => `${option.label}: ${option.option}`)
    .join(", ");

  if (foundedItemIndex === -1) {
    // Item not found in cart, add as a new item
    const newItem = {
      ...productToAdd,
      quantity: 1,
      itemOptions: selectedOptions,
      itemOptionsStringify: sortOptions,
      id: uuidv4(),
    };

    console.log("newItem: ", newItem.itemOptionsStringify);

    return [...cartItems, newItem];
  } else {
    // Item found in cart, check if options are the same
    const existingItem = cartItems[foundedItemIndex];

    const optionsMatch = existingItem.itemOptionsStringify === sortOptions;

    console.log("optionsMatch", optionsMatch);
    console.log("sortOptions", sortOptions);
    console.log(
      "existingItem.itemOptionsStringify",
      existingItem.itemOptionsStringify
    );

    if (optionsMatch) {
      // Options are the same, increase quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[foundedItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      return updatedCartItems;
    } else {
      // Options are different, add as a new item
      const newItem = {
        ...productToAdd,
        quantity: 1,
        itemOptions: selectedOptions,
        itemOptionsStringify: sortOptions,
        id: uuidv4(),
      };

      console.log("newItem: ", newItem.itemOptionsStringify);

      return [...cartItems, newItem];
    }
  }
};

export const decreaseQuantity = (cartItems, itemToDecrease) => {
  const foundedItem = cartItems.find(
    (cartItem) => itemToDecrease.id === cartItem.id
  );

  if (foundedItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== itemToDecrease.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === itemToDecrease.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const increaseQuantity = (cartItems, itemToIncrease) => {
  return cartItems.map((cartItem) =>
    cartItem.id === itemToIncrease.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );
};

export const clearCartItem = (cartItems, productToClear) => {
  const filtredCart = cartItems.filter(
    (cartItem) => cartItem.id !== productToClear.id
  );
  return filtredCart;
};

export const calculateCartValues = (cartItems) => {
  const cartCount = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );
  const cartTotal = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  );

  return { cartCount, cartTotal };
};
