import '@babel/polyfill';
import '../../pages/index.css';
import cartButtonAmount from '../components/cartButtonAmount';
import filterProductsInputs from '../components/filterProductsInputs';
import Product from '../components/Product';
import { productsInfo } from '../utils/constants';

const products = [];
const appliedProductFilters = {
  searchInput: '',
  tags: [],
};

function handleSearchInput(e) {
  appliedProductFilters.searchInput = e.target.value;
  products.forEach((product) => {
    product.filter(appliedProductFilters);
  });
}

function handleOptionInputClick(filterProductsCheckboxInputs) {
  appliedProductFilters.tags = filterProductsCheckboxInputs
    .filter((input) => input.checked)
    .map((input) => input.value);

  products.forEach((product) => {
    product.filter(appliedProductFilters);
  });
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

filterProductsInputs.setupEventListeners({
  handleSearchInput,
  handleOptionInputClick,
});
