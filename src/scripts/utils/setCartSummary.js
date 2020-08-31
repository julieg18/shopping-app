import {
  cartSummarySubtotalPrice,
  cartSummaryTaxesAndFeesPrice,
  cartSummaryTotalPrice,
} from './cartConstants';
import { formatNumberToCurrency } from './utils';

let cartItemsPrices = {};

const cartSummaryPrices = {
  subtotal: 0,
  taxesAndFees: 0,
  totalPrice: 0,
};

function setCartSummaryPrices() {
  cartSummaryPrices.subtotal = Object.values(cartItemsPrices).reduce(
    (p1, p2) => p1 + p2,
  );
  cartSummaryPrices.taxesAndFees =
    cartSummaryPrices.subtotal + cartSummaryPrices.subtotal * 0.042;
  cartSummaryPrices.total =
    cartSummaryPrices.subtotal + cartSummaryPrices.taxesAndFees;
}

function setCartSummaryPriceElements() {
  const { subtotal, taxesAndFees, total } = cartSummaryPrices;

  cartSummarySubtotalPrice.textContent = formatNumberToCurrency(subtotal);
  cartSummaryTaxesAndFeesPrice.textContent = formatNumberToCurrency(
    taxesAndFees,
  );
  cartSummaryTotalPrice.textContent = formatNumberToCurrency(total);
}

function setCartSummary(cartItems) {
  cartItemsPrices = {};

  cartItems.forEach(({ id, price }) => {
    cartItemsPrices[id] = price;
  });

  setCartSummaryPrices();
  setCartSummaryPriceElements();
}

export default setCartSummary;
