import { navCartBtnAmount } from '../utils/constants';

const cartButtonAmount = {
  getAmount: () => Number(navCartBtnAmount.textContent),
  increaseAmount(newAmount = 1) {
    navCartBtnAmount.textContent = this.getAmount() + newAmount;
  },
};

export default cartButtonAmount;
