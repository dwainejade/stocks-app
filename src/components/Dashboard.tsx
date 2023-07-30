import React from "react";
import StockList from "./stock_list/StockList";
import DetailsHeader from "./stock_details/DetailsHeader";
import Chart from "./stock_details/Chart";
import Search from "./Search";
import StockInfo from "./stock_details/StockInfo";

const StockDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-800 text-gray-50">
      {/* Left side with list of stocks */}
      <div className="w-[400px] flex-shrink-0 p-4 overflow-auto bg-grey-100">
        <Search />
        <StockList />
      </div>

      {/* Right side with chart and stock details */}
      <div className="w-full flex-col bg-gray-900 text-gray-50 p-5">
        <DetailsHeader />
        <Chart />
        <StockInfo />
      </div>
    </div>
  );
};

export default StockDashboard;
