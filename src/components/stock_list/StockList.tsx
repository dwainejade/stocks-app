import React, { useContext } from "react";
import StockListItem from "./StockListItem";
import { StockContext } from "../../context/StockContext";
import { StocksContextType } from "../../utils/interfaces";
import { Reorder } from "framer-motion";

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
  const { favoriteStocks, setFavoriteStocks, symbol } = useContext(
    StockContext
  ) as StocksContextType;

  if (!favoriteStocks) return null;

  return (
    <Reorder.Group values={favoriteStocks || []} onReorder={setFavoriteStocks}>
      {favoriteStocks?.map((stock: StockItem) => (
        <Reorder.Item
          key={stock.symbol}
          value={stock}
          className={`border-gray-500 cursor-pointer text-sm h-full px-2 ${
            stock.symbol === symbol ? "bg-gray-700 rounded-md" : null
          }`}
        >
          <StockListItem symbol={stock.symbol} price={stock.quote.c} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default StockList;
