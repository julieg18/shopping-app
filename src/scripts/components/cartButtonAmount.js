import { navCartBtnAmount } from '../utils/indexConstants';

const cartButtonAmount = {
  getAmount: () => Number(navCartBtnAmount.textContent),
  increaseAmount(newAmount = 1) {
    navCartBtnAmount.textContent = this.getAmount() + newAmount;
  },
  setAmount(newAmount) {
    navCartBtnAmount.textContent = newAmount;
  },
};

export default cartButtonAmount;
