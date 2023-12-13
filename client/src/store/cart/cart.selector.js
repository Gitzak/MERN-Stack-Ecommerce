import { createSelector } from "reselect";

const selectCartRducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartRducer],
  (cart) => cart.cartItems
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantityCount * cartItem.discountPrice,
    0
  )
);

// export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
//   cartItems.reduce((total, cartItem) => total + cartItem.quantityCount, 0)
// );
