import React, { useContext } from "react";
import { StockContext } from "../../context/StockContext";
import { StocksContextType } from "../../utils/interfaces";

const DetailsHeader: React.FC = () => {
  const { stock } = useContext(StockContext) as StocksContextType;
  console.log(stock);

  if (!stock) return;

  return (
    <div className="w-full h-30 flex flex-row justify-between items-center py-4 border-b border-gray-600">
      <div className="flex flex-col">
        <span className="text-4xl">{stock?.symbol}</span>
        <span className="text-md">Microsft Corporation</span>
      </div>
      <div className="flex flex-col">
        <span>${stock?.quote.c.toFixed(2)}</span>
        <span
          className={` ${stock.quote.d > 0 ? "text-green-500" : "bg-red-500"}`}
        >
          {stock?.quote.d > 0 ? "+" : "-"}
          {stock?.quote.d.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default DetailsHeader;
