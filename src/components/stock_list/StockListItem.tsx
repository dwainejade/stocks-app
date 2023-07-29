import React, { useContext } from "react";
import { StockContext } from "../../context/StockContext";

interface StockListItemProps {
  symbol: string;
  price: number;
}

const StockListItem: React.FC<StockListItemProps> = ({ symbol, price }) => {
  const { setSymbol } = useContext(StockContext);
  const handleClick = () => {
    setSymbol(symbol);
  };

  return (
    <div
      className="flex justify-between items-center p-2 h-16 rounded-md hover:bg-gray-500 "
      onClick={handleClick}
    >
      <span className="font-medium">{symbol}</span>
      <span className="font-light">{price.toFixed(2)}</span>
    </div>
  );
};

export default StockListItem;
