import React from "react";

interface StockListItemProps {
  symbol: string;
  price: number;
}

const StockListItem: React.FC<StockListItemProps> = ({ symbol, price }) => {
  return (
    <div className="flex justify-between p-2 hover:bg-gray-500 cursor-pointer rounded-md">
      <span className="font-medium">{symbol}</span>
      <span className="font-light">{price}</span>
    </div>
  );
};

export default StockListItem;
