import { productsInfo } from './constants';

function getCartItem(id) {
  return productsInfo.find((item) => item.id === id);
}

function getCartItemPrice({ id, amount }) {
  const cartItem = getCartItem(id);

  return Number(cartItem.price.slice(1)) * amount;
}

function getCartSubtotal(cartItems) {
  const cartPrices = Object.keys(cartItems).map((itemId) =>
    getCartItemPrice({ id: itemId, amount: cartItems[itemId] }),
  );
  return cartPrices.reduce((p1, p2) => p1 * p2);
}

function getCartAmount(cartItems) {
  const cartAmount = Object.values(cartItems).reduce((a1, a2) => a1 + a2);

  return cartAmount;
}

export { getCartItem, getCartItemPrice, getCartSubtotal, getCartAmount };
