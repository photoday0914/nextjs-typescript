import { Item } from './data';
import { sleep } from './utils';

type UserAndItemState = {
  balance: number;
  items: Item[];
};

/**
 * Modifies `state`, given an `itemId` to purchase
 * @returns {UserAndItemState} the updated state if a purchase should succeed
 */
export const executePurchase = async (
  itemId: Item['id'],
  state: UserAndItemState
): Promise<UserAndItemState> => {
  // NOTE: the following line intentionally pauses execution in this
  // function and MUST remain in tact for the assignment to replicate a
  // network request.
  await sleep(1000);
  if (state.items[itemId].inventory <= 0 || state.balance < state.items[itemId].price) throw Error("Not enough balance or out of stock")
  state.balance = state.balance - state.items[itemId].price;
  state.items[itemId].inventory--;
  return state;
  // @TODO: Not implemented
};
