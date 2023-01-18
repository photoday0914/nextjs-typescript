import { useState } from 'react';
import { useCheckout } from '../mock-backend';
import { initialBalance } from '../mock-backend/data';
import styles from './index.module.scss';

type Item = {
  id: number;
  price: number;
  name: string;
  inventory: number;
};

function sortItems(arr: Item[]) {
  let result: Item[] = [];
  for (let i: number = 0; i < arr.length; i++) {
    if (arr[i].inventory != 0) {
      result.push(arr[i]);
    }
  }
  for (let i: number = 0; i < arr.length; i++) {
    if (arr[i].inventory == 0) {
      result.push(arr[i]);
    }
  }
  return result;
}

const Index = () => {
  const { items, buy } = useCheckout();
  const [state, setState] = useState({
    balance: initialBalance,
    items: sortItems(items)
  })

  const [isBuying, setIsBuying] = useState(false);

  function buyItem(itemId: number) {
    setIsBuying(true);
    buy(itemId).then((data) => {
      if (typeof data !== "string") {
        setState(state => ({
          ...{
            balance: data.balance,
            items: sortItems(data.items)
          }
        }));
        setIsBuying(false);
      } else {
        alert(data);
        setIsBuying(false);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <main className={styles.main}>
      <h1>Create, Inc. Store</h1>
      {
        /** @TODO: Not implemented */
        <div className="container px-80">
          <div>
            Balance:{state.balance}
          </div>
          <div className="container">
            <table className='w-320'>
              <thead className="border-b">
                <tr>
                  <th scope="col" className='text-sm font-medium text-gray-900 px-6 py-4 text-center w-80 h-16'>
                    Name
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center w-80 h-16">
                    Price
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center w-80 h-16">
                    Quantity
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center w-80 h-16">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  state.items.map((item: Item, index: number) => (
                    <tr className="" key={index}>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td> */}
                      <td className="text-sm text-gray-900 font-light px-6 py-4 text-center w-80 h-16">
                        {item.name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 text-center w-80 h-16">
                        {item.price}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 text-center w-80 h-16">
                        {item.inventory}
                      </td>
                      <td className="text-sm text-gray-900 font-light py-4 text-center w-80 h-16">
                        {!isBuying ? <button key={index} onClick={() => buyItem(item.id)} className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">
                          BUY
                        </button> : <p className='inline-block px-2 py-2.5 text-xs leading-tight uppercase rounded '>Buy request is running</p>}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </main>
  );
};

export default Index;
