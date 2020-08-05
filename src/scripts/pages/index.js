import '@babel/polyfill';
import '../../pages/index.css';
import cartButtonAmount from '../components/cartButtonAmount';
import filterProducts from '../components/filterProducts';
import Product from '../components/Product';
import { productsInfo } from '../utils/constants';

function handleSearchInput() {}

function handleOptionInputClick() {}

function addToCart({ amount }) {
  cartButtonAmount.increaseAmount(amount);
}

productsInfo.forEach((productInfo) => {
  const newProduct = new Product({
    ...productInfo,
    addToCart,
  });
  newProduct.createProduct();
});

filterProducts.setupEventListeners({
  handleSearchInput,
  handleOptionInputClick,
});
