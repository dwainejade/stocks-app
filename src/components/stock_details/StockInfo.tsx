import React, { useContext } from "react";
import { StockContext } from "../../context/StockContext";
import { StocksContextType } from "../../utils/interfaces";

const StockInfo: React.FC = () => {
  const { stock } = useContext(StockContext) as StocksContextType;

  if (!stock) return null;

  const conStyle = "flex flex-1 justify-between px-2 py-1";
  const leftTextStyle = "text-gray-400";
  const rightTextStyle = "text-white";

  return (
    <div className="grid grid-cols-3 divide-x-2 divide-gray-500">
      <div>
        <div className={conStyle}>
          <p className={leftTextStyle}>Close</p>
          <p className={rightTextStyle}>{stock.quote.c}</p>
        </div>
        <div className={conStyle}>
          <p className={leftTextStyle}>Day</p>
          <p className={rightTextStyle}>{stock.quote.d}</p>
        </div>
        <div className={conStyle}>
          <p className={leftTextStyle}>Day Percentage</p>
          <p className={rightTextStyle}>{stock.quote.dp}</p>
        </div>
      </div>

      <div>
        <div className={conStyle}>
          <p className={leftTextStyle}>High</p>
          <p className={rightTextStyle}>{stock.quote.h}</p>
        </div>
        <div className={conStyle}>
          <p className={leftTextStyle}>Low</p>
          <p className={rightTextStyle}>{stock.quote.l}</p>
        </div>
        <div className={conStyle}>
          <p className={leftTextStyle}>Open</p>
          <p className={rightTextStyle}>{stock.quote.o}</p>
        </div>
      </div>

      <div>
        <div className={conStyle}>
          <p className={leftTextStyle}>Previous Close</p>
          <p className={rightTextStyle}>{stock.quote.pc}</p>
        </div>
        <div className={conStyle}>
          <p className={leftTextStyle}>Time</p>
          <p className={rightTextStyle}>{stock.quote.t}</p>
        </div>
      </div>
    </div>
  );
};

export default StockInfo;
