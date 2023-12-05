export const getProductCartQuantity = (cartItems, product) => {
  let productInCart = cartItems.filter((single) => single.id === product.id);
  if (cartItems.length >= 1 && productInCart) {
    return cartItems.filter((single) => product.id === single.id)
      .quantitySelected;
  } else {
    return 0;
  }
};
