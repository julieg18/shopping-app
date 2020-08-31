const navCartBtnAmount = document.querySelector('.nav-bar__cart-amount');
const filterProductsLabels = Array.from(
  document.querySelectorAll('.filter-products__option-label'),
);
const filterProductsCheckboxInputs = Array.from(
  document.querySelectorAll('.filter-products__option-input'),
);
const searchBar = document.querySelector('.filter-products__search-bar');
const searchInput = searchBar.querySelector('.filter-products__search-input');

const productsNoResultText = document.querySelector(
  '.products__no-results-text',
);

export {
  navCartBtnAmount,
  filterProductsLabels,
  filterProductsCheckboxInputs,
  searchBar,
  searchInput,
  productsNoResultText,
};
