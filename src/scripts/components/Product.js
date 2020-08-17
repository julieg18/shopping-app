class Product {
  constructor({
    id,
    name,
    price,
    size,
    tags,
    description,
    imageAttr,
    imageSrc,
    addToCart,
  }) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._size = size;
    this._tags = tags;
    this._description = description;
    this._imageAttr = imageAttr;
    this._imageSrc = imageSrc;
    this._addToCart = addToCart;
    this._productTemplate = document.querySelector('#product').content;
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
    ).disabled = Number(amountNum.textContent) === 99;
  }

  _handleAddToCartBtnClick() {
    const amountNum = this._product.querySelector('.product__amount-num');
    const product = {
      amount: Number(amountNum.textContent),
      id: this._id,
    };
    this._addToCart(product);

    amountNum.textContent = 1;
  }

  _placeDataInProductElement() {
    const img = this._product.querySelector('.product__image');
    img.src = this._imageSrc;
    img.alt = this._name.toLowerCase();

    const productNameEl = this._product.querySelector('.product__name');
    productNameEl.textContent = this._name;
    productNameEl.title = this._name;

    this._product.querySelector('.product__price').textContent = this._price;
    this._product.querySelector(
      '.product__size',
    ).textContent = `(${this._size})`;
    this._product.querySelector(
      '.product__description',
    ).textContent = this._description;

    const imageAttrEl = this._product.querySelector('.product__image-attr');
    imageAttrEl.title = `Photo by ${this._imageAttr.artist} on ${this._imageAttr.imageSrcText}`;

    const imageArtistLink = imageAttrEl.querySelector(
      '.product__image-attr-link_content_artist-link',
    );
    imageArtistLink.href = this._imageAttr.artistHref;
    imageArtistLink.textContent = this._imageAttr.artist;

    const imageSrcLink = imageAttrEl.querySelector(
      '.product__image-attr-link_content_src-link',
    );
    imageSrcLink.href = this._imageAttr.imageSrcLink;
    imageSrcLink.textContent = this._imageAttr.imageSrcText;
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

  filter({ searchInput, tags }) {
    const matchesSearchInput = this._name
      .toLowerCase()
      .replace(/ /g, '')
      .startsWith(searchInput.toLowerCase().replace(/ /g, ''));
    const matchesTags = tags.every((tag) => this._tags.includes(tag));

    if (matchesSearchInput && matchesTags) {
      this._product.classList.remove('product_hide');
    } else {
      this._product.classList.add('product_hide');
    }
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
