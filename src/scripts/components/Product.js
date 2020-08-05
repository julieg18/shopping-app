class Product {
  constructor({
    id,
    name,
    price,
    size,
    description,
    imageAttr,
    imageSrc,
    addToCart,
    decreaseCartAmount,
    increaseCartAmount,
  }) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._size = size;
    this._description = description;
    this._imageAttr = imageAttr;
    this._imageSrc = imageSrc;
    this._addToCart = addToCart;
    this._decreaseCartAmount = decreaseCartAmount;
    this._increaseCartAmount = increaseCartAmount;
    this._productTemplate = document.querySelector('#product').content;
  }

  _handleAmountBtnClick(action) {
    const amountNum = this._product.querySelector('.product__amount-num');
    amountNum.textContent =
      Number(amountNum.textContent) + (action === 'increase' ? 1 : -1);

    this._product.querySelector(
      '.product__change-amount-btn_action_decrease',
    ).disabled = Number(amountNum.textContent) === 0;
    this._product.querySelector(
      '.product__change-amount-btn_action_increase',
    ).disabled = Number(amountNum.textContent) === 99;
  }

  _handleAddToCartBtnClick() {
    const product = {
      amount: Number(
        this._product.querySelector('.product__amount-num').textContent,
      ),
      id: this._id,
    };
    this._addToCart(product);
  }

  _placeDataInProductElement() {
    const img = this._product.querySelector('.product__image');
    img.src = this._imageSrc;
    img.alt = this._name.toLowerCase();
    this._product.querySelector('.product__name').textContent = this._name;
    this._product.querySelector('.product__price').textContent = this._price;
    this._product.querySelector(
      '.product__size',
    ).textContent = `(${this._size})`;
    this._product.querySelector(
      '.product__description',
    ).textContent = this._description;
  }

  _setUpEventListeners() {
    this._product
      .querySelector('.product__add-to-cart-btn')
      .addEventListener('click', () => this._handleAddToCartBtnClick());
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
