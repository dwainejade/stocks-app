import * as React from "react";
import { StockItem, StocksContextType } from "../utils/interfaces";
import { getUnixTimestamps } from "../utils/helpers";
import localforage from "localforage";

export const StockContext = React.createContext<StocksContextType | null>(null);

const StockProvider = ({ children }) => {
  const [stock, setStock] = React.useState<StockItem | null>(null);
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
      // Check if data in localforage is less than a minute old
      const storedStock = await localforage.getItem<StockItem>(symbol);
      if (storedStock && Date.now() - storedStock.lastUpdated < 60 * 1000) {
        setStock(storedStock);
        return;
      }

      // Fetch data from API
      const candlesResponse = await fetch(
        `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${
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

      // Store data in localforage
      const newStock: StockItem = {
        symbol,
        quote,
        prices: candles.c,
        lastUpdated: Date.now(),
      };
      await localforage.setItem(symbol, newStock);

      setStock(newStock);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  React.useEffect(() => {
    getStock();
  }, [symbol]);

  return (
    <StockContext.Provider value={{ stock, getStock, symbol, setSymbol }}>
      {children}
    </StockContext.Provider>
  );
};

export default StockProvider;
