import '@babel/polyfill';
import '../../pages/cart.css';
import CartProduct from '../components/CartProduct';
import Notification from '../components/Notification';
import setCartSummary from '../utils/cart/setCartSummary';
import { cartClearBtn } from '../utils/cart/constants';
import { getCartItem, getCartItemPrice } from '../utils/cart/cartItems';

const cartItems = JSON.parse(localStorage.getItem('cartItems'));
let updatedCartItems = [];
let cartProducts = [];

function showShoppingCartNotification(text) {
  const addToCartNotification = new Notification({
    type: 'info',
    imageName: 'shopping-cart',
  });
  addToCartNotification.createNotification({ text });
  setTimeout(() => {
    addToCartNotification.showNotification();
  }, 0);
}

function setUpdatedCartItems() {
  updatedCartItems = Object.keys(cartItems).map((id) => {
    const cartItem = getCartItem(id);
    return {
      ...cartItem,
      amount: cartItems[id],
      priceForEach: cartItem.price,
      price: getCartItemPrice({ id, amount: cartItems[id] }),
    };
  });
}

function removeProduct(id) {
  delete cartItems[id];

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  setUpdatedCartItems();
  setCartSummary(updatedCartItems);
  showShoppingCartNotification(
    `${getCartItem(id).name} have been removed from cart.`,
  );
}

function changeProductAmount({ id, amount }) {
  cartItems[id] = amount;
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  setUpdatedCartItems();
  setCartSummary(updatedCartItems);
}

function clearCart() {
  localStorage.setItem('cartItems', JSON.stringify({}));
  updatedCartItems = [];
  setCartSummary(updatedCartItems);
  cartProducts.forEach((cartProduct) => {
    cartProduct.remove();
  });

  showShoppingCartNotification('Cart has been cleared.');
}

setUpdatedCartItems();
setCartSummary(updatedCartItems);

cartProducts = updatedCartItems.map(
  (updatedCardItem) =>
    new CartProduct({
      ...updatedCardItem,
      templateSelector: '#product_place_cart',
      removeProduct,
      changeProductAmount,
    }),
);

cartProducts.forEach((cartProduct) => {
  cartProduct.createProduct();
});

cartClearBtn.addEventListener('click', clearCart);
