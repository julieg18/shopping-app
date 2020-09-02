import { navCartBtnAmount } from './constants';

function increaseCartBtnAmount(newAmount = 1) {
  navCartBtnAmount.textContent =
    Number(navCartBtnAmount.textContent) + newAmount;
}

function setCartBtnAmount(newAmount) {
  navCartBtnAmount.textContent = newAmount;
}

export { increaseCartBtnAmount, setCartBtnAmount };
