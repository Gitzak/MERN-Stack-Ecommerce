export const getProductCartQuantity = (cartItems, product) => {
  let productInCart = cartItems.filter((single) => single.id === product.id);
  if (cartItems.length >= 1 && productInCart) {
    return productInCart.quantityCount
  } else {
    return 0;
  }
};
