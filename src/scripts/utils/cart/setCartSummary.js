import {
  cartSummarySubtotalPrice,
  cartSummaryTaxesAndFeesPrice,
  cartSummaryTotalPrice,
  cartSummaryCheckoutBtn,
} from './constants';
import { formatNumberToCurrency } from '../utils';

let cartItemsPrices = {};

const cartSummaryPrices = {
  subtotal: 0,
  taxesAndFees: 0,
  totalPrice: 0,
};

function setCartSummaryPrices() {
  cartSummaryPrices.subtotal = Object.values(cartItemsPrices).reduce(
    (p1, p2) => p1 + p2,
    0,
  );
  cartSummaryPrices.taxesAndFees =
    cartSummaryPrices.subtotal + cartSummaryPrices.subtotal * 0.042;
  cartSummaryPrices.total =
    cartSummaryPrices.subtotal + cartSummaryPrices.taxesAndFees;
}

function setCartSummaryElements() {
  const { subtotal, taxesAndFees, total } = cartSummaryPrices;

  cartSummarySubtotalPrice.textContent = formatNumberToCurrency(subtotal);
  cartSummaryTaxesAndFeesPrice.textContent = formatNumberToCurrency(
    taxesAndFees,
  );
  cartSummaryTotalPrice.textContent = formatNumberToCurrency(total);
  cartSummaryCheckoutBtn.disabled = subtotal === 0;
}

function setCartSummary(cartItems) {
  cartItemsPrices = {};

  cartItems.forEach(({ id, price }) => {
    cartItemsPrices[id] = price;
  });

  setCartSummaryPrices();
  setCartSummaryElements();
}

export default setCartSummary;
