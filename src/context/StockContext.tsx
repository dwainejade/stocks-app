import * as React from 'react';
import { StockItem, StocksContextType } from '../utils/interfaces';

export const StockContext = React.createContext<StocksContextType | null>(null);
console.log('token', import.meta.env.VITE_APP_API_KEY);

const StockProvider = ({ children }) => {
  const [stocks, setStocks] = React.useState<StockItem[] | []>([]);

  //   const getStock = async (name: string) => {
  //     try {
  //       const data = await fetch(`wss://ws.finnhub.io/quote?symbol=${name}`)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           console.log(data);
  //           return data;
  //         })
  //         .catch((error) => error);

  //       setStocks([...stocks, data]);
  //     } catch (error) {
  //       console.log(error);
  //       return error;
  //     }
  //   };

  const getStock = async () => {
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=MSFT&token=${
          import.meta.env.VITE_APP_API_KEY
        }`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch response, status: ${response.status}`);
      }

      const data = await response.json();
      setStocks([...stocks, { symbol: 'MSFT', quote: data }]);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  React.useEffect(() => {
    getStock();
  }, []);

  return (
    <StockContext.Provider value={{ stocks, getStock }}>
      {children}
    </StockContext.Provider>
  );
};

export default StockProvider;
