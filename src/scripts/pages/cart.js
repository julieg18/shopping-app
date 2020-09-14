import '@babel/polyfill';
import '../../pages/cart.css';
import CartProduct from '../components/CartProduct';
import setCartSummary from '../utils/cart/setCartSummary';
import { cartClearBtn } from '../utils/cart/constants';
import { getCartItem, getCartItemPrice } from '../utils/cart/cartItems';

const cartItems = JSON.parse(localStorage.getItem('cartItems'));
let updatedCartItems = [];
let cartProducts = [];

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
