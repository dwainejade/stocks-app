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
  const { favoriteStocks, setFavoriteStocks } = useContext(
    StockContext
  ) as StocksContextType;

  if (!favoriteStocks) return null;

  return (
    <Reorder.Group
      values={favoriteStocks || []}
      onReorder={setFavoriteStocks}
      layoutScroll
      axis="y"
    >
      {favoriteStocks?.map((stock: StockItem) => (
        <Reorder.Item key={stock.symbol} value={stock}>
          <StockListItem symbol={stock.symbol} price={stock.quote.c} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default StockList;
