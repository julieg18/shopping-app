import Product from './Product';
import { formatNumberToCurrency } from '../utils/utils';

class CartProduct extends Product {
  constructor(args) {
    super(args);
    const { removeProduct, changeProductAmount, amount, priceForEach } = args;
    this._amount = amount;
    this._removeProduct = removeProduct;
    this._changeProductAmount = changeProductAmount;
    this._priceForEach = priceForEach;
  }

  _handleAmountBtnClick(action) {
    super._handleAmountBtnClick(action);

    this._amount += action === 'increase' ? 1 : -1;
    this._price = this._amount * this._priceForEach;

    this._product.querySelector(
      '.product__price',
    ).textContent = formatNumberToCurrency(this._price);

    this._changeProductAmount({
      amount: this._amount,
      id: this.id,
    });
  }

  _placeDataInProductElement() {
    super._placeDataInProductElement();

    this._product.querySelector(
      '.product__price-for-each',
    ).textContent = `Each: ${formatNumberToCurrency(this._priceForEach)}`;

    this._product.querySelector(
      '.product__amount-num',
    ).textContent = this._amount;
  }

  _setUpEventListeners() {
    super._setUpEventListeners();

    this._product
      .querySelector('.product__remove-btn')
      .addEventListener('click', () => {
        this._removeProduct(this.id);
        this._product.remove();
      });
  }
}

export default CartProduct;
