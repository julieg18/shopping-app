import productsInfo from '../productsInfo';

function getCartItem(id) {
  return productsInfo.find((item) => item.id === id);
}

function getCartItemPrice({ id, amount }) {
  const cartItem = getCartItem(id);

  return cartItem.price * amount;
}

function getCartSubtotal(cartItems) {
  if (Object.values(cartItems).length === 0) return 0;
  const cartPrices = Object.keys(cartItems).map((itemId) =>
    getCartItemPrice({ id: itemId, amount: cartItems[itemId] }),
  );
  return cartPrices.reduce((p1, p2) => p1 + p2);
}

function getCartAmount(cartItems) {
  if (Object.values(cartItems).length === 0) return 0;
  const cartAmount = Object.values(cartItems).reduce((a1, a2) => a1 + a2);

  return cartAmount;
}

export { getCartItem, getCartItemPrice, getCartSubtotal, getCartAmount };
