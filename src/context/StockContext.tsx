import * as React from "react";
import { StockItem, StocksContextType } from "../utils/interfaces";
import { ObjectToArray } from "../utils/helpers";
import localforage from "localforage";

export const StockContext = React.createContext<StocksContextType | null>(null);
const KEY = import.meta.env.VITE_APP_API_KEY;

const StockProvider: React.FC = ({ children }) => {
  const [stock, setStock] = React.useState<StockItem | null>(null);
  const [symbol, setSymbol] = React.useState<string>("");
  const [favoriteStocks, setFavoriteStocks] = React.useState<StockItem[]>([]);
  const favoriteSymbols: string[] = [];
  const ranges: string[] = ["1D", "1W", "1M", "1Y"];
  const [selectedRange, setSelectedRange] = React.useState<string>("1D");

  const getFavoriteStocks = async () => {
    const stocks = [];
    for (const symbol of favoriteSymbols) {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${KEY}`
      );
      const quote = await response.json();
      stocks.push({ symbol, quote });
    }
    setFavoriteStocks(stocks);
    await localforage.setItem("favoriteStocks", stocks);
  };

  React.useEffect(() => {
    const loadFavoriteStocks = async () => {
      const storedFavoriteStocks = await localforage.getItem<StockItem[]>(
        "favoriteStocks"
      );
      if (storedFavoriteStocks) {
        setFavoriteStocks(storedFavoriteStocks);
      }
    };
    loadFavoriteStocks();
  }, []);

  React.useEffect(() => {
    localforage.setItem("favoriteStocks", favoriteStocks);
  }, [favoriteStocks]);

  const getStock = async () => {
    try {
      // Map selectedRange to resolution
      const rangeToResolutionMap = {
        "1D": { resolution: "1", duration: 1 },
        "1W": { resolution: "5", duration: 7 },
        "1M": { resolution: "30", duration: 30 },
        "1Y": { resolution: "D", duration: 365 },
      };
      const { resolution, duration } = rangeToResolutionMap[selectedRange];
      // Create a key using both symbol and range
      const key = `${symbol}_${selectedRange}`;

      // Check if data in localforage is less than a minute old
      const storedStock = await localforage.getItem<StockItem>(key);
      if (storedStock && Date.now() - storedStock.lastUpdated < 60 * 1000) {
        setStock(storedStock);
        console.log("From localForage");
        return;
      }

      // Calculate from and to timestamps based on the selected range
      const to = Math.floor(Date.now() / 1000);
      const from = to - duration * 24 * 60 * 60;

      // Fetch data from API
      const candlesResponse = await fetch(
        `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${KEY}`
      );

      const quoteResponse = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${KEY}`
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
      const candlePrices = ObjectToArray(candles);

      // Store data in localforage
      const newStock: StockItem = {
        symbol,
        quote,
        prices: candlePrices,
        lastUpdated: Date.now(),
      };

      // Store data in localforage using the key
      await localforage.setItem(key, newStock);

      setStock(newStock);
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  React.useEffect(() => {
    getStock();
  }, [symbol, selectedRange]);

  React.useEffect(() => {
    getFavoriteStocks();
  }, []);

  const searchStock = async (query) => {
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/search?q=${query}&token=${KEY}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <StockContext.Provider
      value={{
        stock,
        getStock,
        symbol,
        setSymbol,
        favoriteStocks,
        setFavoriteStocks,
        ranges,
        selectedRange,
        setSelectedRange,
        searchStock,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};

export default StockProvider;
