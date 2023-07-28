import React from 'react';
import { mockListData } from '../../constants/mockData';

interface StockInfoProps {
  symbol: string;
  quote: {
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
  };
}

const sampleStock: StockInfoProps = mockListData[1];
console.log(sampleStock);

const StockInfo: React.FC = () => {
  return (
    <div className="grid grid-cols-3 divide-x-2">
      <div>
        <div className="flex flex-1 justify-between px-2 py-1">
          <p>c</p>
          <p>{sampleStock.quote.c}</p>
        </div>
        <div className="flex flex-1 justify-between px-2 py-1">
          <p>d</p>
          <p>{sampleStock.quote.d}</p>
        </div>
        <div className="flex flex-1 justify-between px-2 py-1">
          <p>dp</p>
          <p>{sampleStock.quote.dp}</p>
        </div>
      </div>

      <div>
        <div className="flex flex-1 justify-between px-2 py-1">
          <p>h</p>
          <p>{sampleStock.quote.h}</p>
        </div>
        <div className="flex flex-1 justify-between px-2 py-1">
          <p>l</p>
          <p>{sampleStock.quote.l}</p>
        </div>
        <div className="flex flex-1 justify-between px-2 py-1">
          <p>o</p>
          <p>{sampleStock.quote.o}</p>
        </div>
      </div>

      <div>
        <div className="flex flex-1 justify-between px-2 py-1">
          <p>pc</p>
          <p>{sampleStock.quote.pc}</p>
        </div>
        <div className="flex flex-1 justify-between px-2 py-1">
          <p>t</p>
          <p>{sampleStock.quote.t}</p>
        </div>
      </div>
    </div>
  );
};

export default StockInfo;
