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

function handleSearchInputFocus() {
  searchBar.classList.add('filter-products__search-bar_focused');
}

function handleSearchInputBlur() {
  searchBar.classList.remove('filter-products__search-bar_focused');
}

const filterProductsInputs = {
  setupEventListeners({ handleSearchInput, handleOptionInputClick }) {
    filterProductsLabels.forEach((label) => {
      label.addEventListener('click', triggerInputClick);
    });
    filterProductsCheckboxInputs.forEach((input) => {
      input.addEventListener('click', handleOptionInputClick);
    });

    searchInput.addEventListener('focus', handleSearchInputFocus);
    searchInput.addEventListener('blur', handleSearchInputBlur);
    searchInput.addEventListener('input', handleSearchInput);
  },
};

export default filterProductsInputs;
