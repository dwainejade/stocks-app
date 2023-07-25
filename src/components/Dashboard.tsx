import React from "react";
import StockList from "./stock_list/StockList";
import DetailsHeader from "./stock_details/DetailsHeader";
import Chart from "./stock_details/Chart";

const StockDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-800 text-gray-50">
      {/* Left side with list of stocks */}
      <div className="w-1/3 p-4 overflow-auto bg-grey-100">
        <StockList />
      </div>

      {/* Right side with chart and stock details */}
      <div className="w-2/3 bg-gray-900 text-gray-50 p-4">
        <DetailsHeader />
        <Chart />
      </div>
    </div>
  );
};

export default StockDashboard;
