const navCartBtnAmount = document.querySelector('.nav-bar__cart-amount');
const filterProductsLabels = Array.from(
  document.querySelectorAll('.filter-products__option-label'),
);
const filterProductsCheckboxInputs = document.querySelectorAll(
  '.filter-products__option-input',
);
const searchBar = document.querySelector('.filter-products__search-bar');
const searchInput = searchBar.querySelector('.filter-products__search-input');

export {
  navCartBtnAmount,
  filterProductsLabels,
  filterProductsCheckboxInputs,
  searchBar,
  searchInput,
};
