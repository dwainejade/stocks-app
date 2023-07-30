import React, { useContext } from "react";
import { StockContext } from "../../context/StockContext";
import { StocksContextType } from "../../utils/interfaces";

const StockInfo: React.FC = () => {
  const { stock } = useContext(StockContext) as StocksContextType;

  if (!stock) return null;

  const conStyle = "flex flex-1 justify-between px-[12%] py-1";
  const leftTextStyle = "text-gray-400";
  const rightTextStyle = "text-white";

  const date = new Date(stock.quote.t * 1000);
  const dateString = date.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
  });
  let timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  timeString = timeString.startsWith("0") ? timeString.slice(1) : timeString;

  return (
    <div className="grid grid-cols-3 divide-x-2 divide-gray-700 w-full mt-2">
      <div>
        <div className={conStyle}>
          <p className={leftTextStyle}>Open</p>
          <p className={rightTextStyle}>{stock.quote.o}</p>
        </div>
        <div className={conStyle}>
          <p className={leftTextStyle}>High</p>
          <p className={rightTextStyle}>{stock.quote.h.toFixed(2)}</p>
        </div>
        <div className={conStyle}>
          <p className={leftTextStyle}>Low</p>
          <p className={rightTextStyle}>{stock.quote.l.toFixed(2)}</p>
        </div>
      </div>

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
          <p className={rightTextStyle}>{stock.quote.dp.toFixed(2)}</p>
        </div>
      </div>

      <div>
        <div className={conStyle}>
          <p className={leftTextStyle}>Previous Close</p>
          <p className={rightTextStyle}>{stock.quote.pc}</p>
        </div>
        <div className={conStyle}>
          <p className={leftTextStyle}>Date</p>
          <p className={rightTextStyle}>{dateString}</p>
        </div>
        <div className={conStyle}>
          <p className={leftTextStyle}>Time</p>
          <p className={rightTextStyle}>{timeString}</p>
        </div>
      </div>
    </div>
  );
};

export default StockInfo;
