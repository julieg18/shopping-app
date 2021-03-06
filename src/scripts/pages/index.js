import '@babel/polyfill';
import '../../pages/index.css';
import {
  increaseCartBtnAmount,
  setCartBtnAmount,
} from '../utils/index/cartButtonAmount';
import setUpFilterProductsInputsEventListeners from '../utils/index/filterProductsInputs';
import AvailableProduct from '../components/AvailableProduct';
import Notification from '../components/Notification';
import { productsNoResultText } from '../utils/index/constants';
import productsInfo from '../utils/productsInfo';
import { getCartAmount, getCartSubtotal } from '../utils/cart/cartItems';
import { formatNumberToCurrency } from '../utils/utils';

let productEls;
let cartSubtotal = 0;
const products = [];
const appliedProductFilters = {
  searchInput: '',
  tags: [],
};
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};

function fillPageWithInitialData() {
  setCartBtnAmount(getCartAmount(cartItems));
  cartSubtotal = getCartSubtotal(cartItems);
}
fillPageWithInitialData();

function checkForNoProductResults() {
  const areAllProductsHidden = productEls.every((productEl) =>
    productEl.className.includes('product_hide'),
  );
  if (areAllProductsHidden) {
    productsNoResultText.classList.remove('products__no-results-text_hidden');
  } else {
    productsNoResultText.classList.add('products__no-results-text_hidden');
  }
}

function handleSearchInput(e) {
  appliedProductFilters.searchInput = e.target.value;
  products.forEach((product) => {
    product.filter(appliedProductFilters);
  });
  checkForNoProductResults();
}

function handleOptionInputClick(filterProductsCheckboxInputs) {
  appliedProductFilters.tags = filterProductsCheckboxInputs
    .filter((input) => input.checked)
    .map((input) => input.value);

  products.forEach((product) => {
    product.filter(appliedProductFilters);
  });

  checkForNoProductResults();
}

function showCartNotification(amount) {
  const addToCartNotification = new Notification({
    type: 'info',
    imageName: 'shopping-cart',
  });
  addToCartNotification.createNotification({
    text: `${amount} item${amount === 1 ? '' : 's'} added to cart.`,
    subtext: `Cart Subtotal: ${formatNumberToCurrency(cartSubtotal)}`,
  });
  setTimeout(() => {
    addToCartNotification.showNotification();
  }, 0);
}

function addToCart({ amount, id }) {
  increaseCartBtnAmount(amount);

  cartSubtotal += Number(
    productsInfo.find((product) => product.id === id).price,
  );

  showCartNotification(amount);

  cartItems[id] = cartItems[id] ? cartItems[id] + amount : amount;
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  const selectedProduct = products.find((product) => product.id === id);
  selectedProduct.updateMaxAmount(99 - cartItems[id]);
}

productsInfo.forEach((productInfo) => {
  const maxAmount = 99 - (cartItems[productInfo.id] || 0);
  const newProduct = new AvailableProduct({
    ...productInfo,
    maxAmount,
    addToCart,
    templateSelector: '#product',
  });
  newProduct.createProduct();
  products.push(newProduct);
});
productEls = Array.from(document.querySelectorAll('.product'));

setUpFilterProductsInputsEventListeners({
  handleSearchInput,
  handleOptionInputClick,
});
