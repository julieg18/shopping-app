import '@babel/polyfill';
import '../../pages/index.css';
import cartButtonAmount from '../components/cartButtonAmount';
import filterProductsInputs from '../components/filterProductsInputs';
import Product from '../components/Product';
import { productsInfo, productsNoResultText } from '../utils/constants';

let productEls;

const products = [];
const appliedProductFilters = {
  searchInput: '',
  tags: [],
};

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

function addToCart({ amount }) {
  cartButtonAmount.increaseAmount(amount);
}

productsInfo.forEach((productInfo) => {
  const newProduct = new Product({
    ...productInfo,
    addToCart,
  });
  newProduct.createProduct();
  products.push(newProduct);
});
productEls = Array.from(document.querySelectorAll('.product'));

filterProductsInputs.setupEventListeners({
  handleSearchInput,
  handleOptionInputClick,
});
