import React, { useContext } from "react";
// import { mockListData } from "../../constants/mockData";
import StockListItem from "./StockListItem"; // Replace with the actual path to StockListItem
import { StockContext } from "../../context/StockContext";

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
  const { favoriteStocks, symbol } = useContext(StockContext);

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
