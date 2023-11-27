export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

export const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`unhandled type ${type} in cartReducer`);
  }
};
