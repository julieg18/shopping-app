import { formatNumberToCurrency } from '../utils/utils';

class Product {
  constructor({
    id,
    name,
    price,
    size,
    imageSrc,
    maxAmount = 99,
    templateSelector,
  }) {
    this.id = id;
    this._name = name;
    this._price = price;
    this._size = size;
    this._imageSrc = imageSrc;
    this.maxAmount = maxAmount;
    this._productTemplate = document.querySelector(templateSelector).content;
  }

  _handleAmountBtnClick(action) {
    const amountNum = this._product.querySelector('.product__amount-num');
    amountNum.textContent =
      Number(amountNum.textContent) + (action === 'increase' ? 1 : -1);

    this._product.querySelector(
      '.product__change-amount-btn_action_decrease',
    ).disabled = Number(amountNum.textContent) === 1;
    this._product.querySelector(
      '.product__change-amount-btn_action_increase',
    ).disabled = Number(amountNum.textContent) === this.maxAmount;
  }

  _placeDataInProductElement() {
    const img = this._product.querySelector('.product__image');
    img.src = this._imageSrc;
    img.alt = this._name.toLowerCase();

    const productNameEl = this._product.querySelector('.product__name');
    productNameEl.textContent = this._name;
    productNameEl.title = this._name;

    this._product.querySelector(
      '.product__price',
    ).textContent = formatNumberToCurrency(this._price);
    this._product.querySelector(
      '.product__size',
    ).textContent = `(${this._size})`;
  }

  _setUpEventListeners() {
    this._product
      .querySelector('.product__change-amount-btn_action_increase')
      .addEventListener('click', () => this._handleAmountBtnClick('increase'));
    this._product
      .querySelector('.product__change-amount-btn_action_decrease')
      .addEventListener('click', () => this._handleAmountBtnClick('decrease'));
  }

  createProduct() {
    this._product = this._productTemplate
      .querySelector('.product')
      .cloneNode(true);

    this._placeDataInProductElement();
    this._setUpEventListeners();
    document.querySelector('.products__list').append(this._product);
  }
}

export default Product;
