import Product from './Product';

class AvailableProduct extends Product {
  constructor(args) {
    super(args);
    const { imageAttr, description, addToCart, tags } = args;
    this._imageAttr = imageAttr;
    this._description = description;
    this._addToCart = addToCart;
    this._tags = tags;
  }

  _handleAddToCartBtnClick() {
    const amountNum = this._product.querySelector('.product__amount-num');
    const product = {
      amount: Number(amountNum.textContent),
      id: this.id,
    };
    this._addToCart(product);

    amountNum.textContent = 1;
    this._product.querySelector(
      '.product__change-amount-btn_action_decrease',
    ).disabled = true;
  }

  _placeDataInProductElement() {
    super._placeDataInProductElement();

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
    super._setUpEventListeners();

    this._product
      .querySelector('.product__add-to-cart-btn')
      .addEventListener('click', () => this._handleAddToCartBtnClick());
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
}

export default AvailableProduct;
