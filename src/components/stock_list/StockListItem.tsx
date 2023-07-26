import React from "react";

interface StockListItemProps {
  symbol: string;
  price: number;
}

const StockListItem: React.FC<StockListItemProps> = ({ symbol, price }) => {
  return (
    <div className="flex justify-between items-center p-2 h-16 rounded-md hover:bg-gray-500 ">
      <span className="font-medium">{symbol}</span>
      <span className="font-light">{price.toFixed(2)}</span>
    </div>
  );
};

export default StockListItem;
