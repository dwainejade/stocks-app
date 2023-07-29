import React, { useContext } from "react";
import StockListItem from "./StockListItem";
import { StockContext } from "../../context/StockContext";
import { StocksContextType } from "../../utils/interfaces";

interface StockItem {
  symbol: string;
  quote: {
    c: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
  };
}

const StockList: React.FC = () => {
  const { favoriteStocks, symbol } = useContext(
    StockContext
  ) as StocksContextType;

  return (
    <div>
      {favoriteStocks?.map((stock: StockItem, index: number) => (
        <div
          key={index}
          className={`border-gray-500 cursor-pointer ${
            stock.symbol === symbol ? "bg-gray-700 rounded-md" : null
          }`}
        >
          <StockListItem symbol={stock?.symbol} price={stock?.quote.c} />
        </div>
      ))}
    </div>
  );
};

export default StockList;
