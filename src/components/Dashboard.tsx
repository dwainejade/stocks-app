import React from "react";
import StockListItem from "./StockListItem";

const StockDashboard: React.FC = () => {
  // Mock data for now
  const stocks = ["AAPL", "GOOGL", "AMZN", "FB"];

  return (
    <div className="flex h-screen bg-gray-800 text-gray-50">
      {/* Left side with list of stocks */}
      <div className="w-1/3 p-4 overflow-auto bg-grey-100">
        <ul>
          {stocks.map((stock, index) => (
            <StockListItem key={index} symbol={stock} price={128} />
          ))}
        </ul>
      </div>

      {/* Right side with chart and stock details */}
      <div className="w-2/3 bg-gray-900 text-gray-50 p-4">
        <h2 className="text-2xl">Stock Chart Placeholder</h2>
        <div className="mt-4 border-t pt-4">
          <h3 className="text-lg">Stock Details Placeholder</h3>
        </div>
      </div>
    </div>
  );
};

export default StockDashboard;
