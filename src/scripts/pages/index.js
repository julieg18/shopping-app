import '@babel/polyfill';
import '../../pages/index.css';
import cartButtonAmount from '../components/cartButtonAmount';
import filterProductsInputs from '../components/filterProductsInputs';
import AvailableProduct from '../components/AvailableProduct';
import Notification from '../components/Notification';
import { productsNoResultText } from '../utils/constants';
import productsInfo from '../utils/productsInfo';
import { getCartAmount, getCartSubtotal } from '../utils/cartItems';
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
  cartButtonAmount.setAmount(getCartAmount(cartItems));
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
  cartButtonAmount.increaseAmount(amount);

  cartSubtotal += Number(
    productsInfo.find((product) => product.id === id).price,
  );

  showCartNotification(amount);

  cartItems[id] = cartItems[id] ? cartItems[id] + amount : amount;
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

productsInfo.forEach((productInfo) => {
  const newProduct = new AvailableProduct({
    ...productInfo,
    addToCart,
    templateSelector: '#product',
  });
  newProduct.createProduct();
  products.push(newProduct);
});
productEls = Array.from(document.querySelectorAll('.product'));

filterProductsInputs.setupEventListeners({
  handleSearchInput,
  handleOptionInputClick,
});
