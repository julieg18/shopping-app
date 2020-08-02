import {
  filterProductsLabels,
  filterProductsCheckboxInputs,
  searchBar,
  searchInput,
} from '../utils/constants';

function triggerInputClick(e) {
  const input = e.currentTarget.querySelector('input');
  input.click();
}

const filterProducts = {
  setupEventListeners({ handleSearchInput, handleOptionInputClick }) {
    filterProductsLabels.forEach((label) => {
      label.addEventListener('click', triggerInputClick);
    });
    filterProductsCheckboxInputs.forEach((input) => {
      input.addEventListener('click', handleOptionInputClick);
    });

    searchInput.addEventListener('focus', () => {
      searchBar.classList.add('filter-products__search-bar_focused');
    });
    searchInput.addEventListener('blur', () => {
      searchBar.classList.remove('filter-products__search-bar_focused');
    });
    searchInput.addEventListener('input', handleSearchInput);
  },
};

export default filterProducts;
