import React from "react";
import StockList from "./stock_list/StockList";
import DetailsHeader from "./stock_details/DetailsHeader";
import Chart from "./stock_details/Chart";
import Search from "./Search";
import StockInfo from "./stock_details/StockInfo";

const StockDashboard: React.FC = () => {
  return (
    <div className="flex  h-screen w-screen bg-gray-800 text-gray-50">
      {/* Left side with list of stocks */}
      <div className="w-[330px] flex-shrink-0 p-3 overflow-y-auto bg-grey-100">
        <Search />
        <StockList />
      </div>

      {/* Right side with chart and stock details */}
      <div className="flex-grow flex justify-center items-start bg-gray-900 text-gray-50 p-5 ">
        <div className="max-w-[900px] flex flex-col items-center justify-center">
          <DetailsHeader />
          <Chart />
          <StockInfo />
          {/* Stock News */}
        </div>
      </div>
    </div>
  );
};

export default StockDashboard;
