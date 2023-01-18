import { initialBalance, initialItems, Item } from './data';
import { executePurchase } from './purchase';

type UserAndItemState = {
  balance: number;
  items: Item[];
};

type UseCheckout = {
  items: Item[];

  /**
   * Charges the current account with the `price` in USD and decrements an item's inventory
   *
   * @throws if the current account does not have enough or if no inventory
   *
   */
  buy: (itemId: Item['id']) => Promise<UserAndItemState | string>;
};

let state = {
  balance: initialBalance,
  items: initialItems
};

export const useCheckout = (): UseCheckout =>
// @TODO: Not implemented
({
  buy: async (itemId: Item['id']): Promise<UserAndItemState | string> => {
    // @TODO: Not implemented
    // executePurchase(...)
    if (state.balance < state.items[itemId].price || state.items[itemId].inventory == 0) return "Not enough balance or out of stock";
    let newState: UserAndItemState | string = await executePurchase(itemId, state);
    state = newState;
    return newState;
  },
  items: initialItems, // @TODO: Not implemented
});
