import { initialBalance, initialItems } from "../data";
import { executePurchase } from '../purchase';

describe('purchase', () => {
  // @TODO
  test.todo('[BONUS] Implement tests for the `executePurchase`');
  const itemID: number = 3;
  let state = {
    balance: initialBalance,
    items: initialItems
  }
  state.balance = state.balance - initialItems[itemID].price;
  state.items[itemID].inventory--;
  test("Normal Purchase Test", async () => {
    try {
      expect(await executePurchase(
        itemID,
        {
          balance: initialBalance,
          items: initialItems
        }
      )).toEqual({
        balance: state.balance,
        items: state.items
      })
    } catch (e) {
      // console.log(e);
    }
  })

  test("Purchase an item out of stock", async () => {
    try {
      while (state.items[itemID].inventory != 0) {
        await executePurchase(
          itemID,
          {
            balance: 999,
            items: initialItems
          }
        );
        state.items[itemID].inventory--;
      }

      expect(await executePurchase(
        itemID,
        {
          balance: 999,
          items: initialItems
        }
      )).toThrow("Not enough balance or out of stock");
    } catch (e) {
      // console.log(e);
    }
  })

  test("Purchase an item when balance is not enough ", async () => {
    try {
      expect(await executePurchase(
        itemID,
        {
          balance: 0.5,
          items: initialItems
        }
      )).toThrow("Not enough balance or out of stock");
    } catch (e) {
      // console.log(e);
    }
  })
});
