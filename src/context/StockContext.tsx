import * as React from "react";
import { StockItem, StocksContextType } from "../utils/interfaces";
import { getUnixTimestamps } from "../utils/helpers";

export const StockContext = React.createContext<StocksContextType | null>(null);

const StockProvider = ({ children }) => {
  const [stocks, setStocks] = React.useState<StockItem[] | []>([]);
  const [symbol, setSymbol] = React.useState<string>("AAPL");

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
        ` https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${
          getUnixTimestamps(new Date()).oneYearAgo
        }&to=${getUnixTimestamps(new Date()).today}&token=${
          import.meta.env.VITE_APP_API_KEY
        }`
      );

      const quoteResponse = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${
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

      setStocks([...stocks, { symbol, quote, prices: candles.c }]);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  React.useEffect(() => {
    getStock();
  }, [symbol]);

  return (
    <StockContext.Provider value={{ stocks, getStock, setSymbol }}>
      {children}
    </StockContext.Provider>
  );
};

export default StockProvider;
