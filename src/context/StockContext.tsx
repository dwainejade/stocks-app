import * as React from 'react';
import { StockItem, StocksContextType } from '../utils/interfaces';

export const StockContext = React.createContext<StocksContextType | null>(null);

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
      const candlesResponse = await fetch(
        ` https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=1&from=${
          Math.floor(Date.now() / 1000) - 3600 * 24 * 30
        }&to=${Math.floor(Date.now() / 1000)}&token=${
          import.meta.env.VITE_APP_API_KEY
        }`
      );

      const quoteResponse = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=MSFT&token=${
          import.meta.env.VITE_APP_API_KEY
        }`
      );

      if (!quoteResponse.ok || !candlesResponse.ok) {
        throw new Error(
          `Failed to fetch response, status: ${
            quoteResponse.status || candlesResponse.status
          }`
        );
      }

      const quote = await quoteResponse.json();
      const candles = await candlesResponse.json();

      setStocks([...stocks, { symbol: 'MSFT', quote, prices: candles.c }]);
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
