import React, { useContext } from 'react';
import { StockContext } from '../../context/StockContext';
import { StocksContextType } from '../../utils/interfaces';

const DetailsHeader: React.FC = () => {
  const { stocks } = useContext(StockContext) as StocksContextType;
  console.log(stocks[0]);

  if (!stocks) return;

  return (
    <div className="w-full h-30 flex flex-row justify-between items-center py-4 border-b border-gray-600">
      <div className="flex flex-col">
        <span className="text-4xl">{stocks[0]?.symbol}</span>
        <span className="text-md">Microsft Corporation</span>
      </div>
      <div className="flex flex-col">
        <span>${stocks[0]?.quote.c.toFixed(2)}</span>
        <span>
          {stocks[0]?.quote.d > 0 ? '+' : '-'}
          {stocks[0]?.quote.d.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default DetailsHeader;
