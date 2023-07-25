import React from "react";

const DetailsHeader: React.FC = () => {
  return (
    <div className="w-full h-30 flex flex-row justify-between items-center py-4 border-b border-gray-600">
      <div className="flex flex-col">
        <span className="text-4xl">MSFT</span>
        <span className="text-md">Microsft Corporation</span>
      </div>
      <div className="flex flex-col">
        <span>348.86</span>
        <span>+3.75</span>
      </div>
    </div>
  );
};

export default DetailsHeader;
