import React from "react";
import { mockListData } from "../../constants/mockData";
import StockListItem from "./StockListItem"; // Replace with the actual path to StockListItem

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
  return (
    <div>
      {mockListData.map((stock: StockItem, index: number) => (
        <div className="border-gray-500 cursor-pointer">
          <StockListItem
            key={index}
            symbol={stock.symbol}
            price={stock.quote.c}
          />
        </div>
      ))}
    </div>
  );
};

export default StockList;
