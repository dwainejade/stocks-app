import React, { useContext } from 'react';
import { StockContext } from '../../context/StockContext';
import { StocksContextType } from '../../utils/interfaces';

interface StockListItemProps {
  symbol: string;
  price: number;
}

const StockListItem: React.FC<StockListItemProps> = ({ symbol, price }) => {
  const { symbol: selectedSymbol, setSymbol } = useContext(
    StockContext
  ) as StocksContextType;

  const handleClick = () => {
    setSymbol(symbol);
  };

  return (
    <div
      className={`flex justify-between p-4 border-gray-500 rounded-md cursor-pointer text-sm h-full hover:bg-gray-600 ${
        symbol === selectedSymbol ? 'bg-gray-700' : 'bg-gray-800'
      }`}
      onClick={handleClick}
    >
      <span className="font-medium">{symbol}</span>
      <span className="font-light">{price?.toFixed(2)}</span>
    </div>
  );
};

export default StockListItem;
