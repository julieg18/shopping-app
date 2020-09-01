import '@babel/polyfill';
import '../../pages/cart.css';
import CartProduct from '../components/CartProduct';
import setCartSummary from '../utils/cart/setCartSummary';
import { getCartItem, getCartItemPrice } from '../utils/cart/cartItems';

const cartItems = JSON.parse(localStorage.getItem('cartItems'));
let updatedCartItems = {};

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

setUpdatedCartItems();
setCartSummary(updatedCartItems);

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

const cartProducts = updatedCartItems.map(
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
