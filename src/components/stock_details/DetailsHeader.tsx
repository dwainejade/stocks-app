import React, { useContext } from "react";
import { StockContext } from "../../context/StockContext";
import { StocksContextType } from "../../utils/interfaces";
import { CheckCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import companyStocks from "../../constants/companySymbols.json";

const DetailsHeader: React.FC = () => {
  const { stock, favoriteStocks, setFavoriteStocks } = useContext(
    StockContext
  ) as StocksContextType;

  if (!stock) return;

  const handleFavoriteClick = () => {
    if (
      favoriteStocks.some(
        (favoriteStock) => favoriteStock.symbol === stock.symbol
      )
    ) {
      setFavoriteStocks(
        favoriteStocks.filter(
          (favoriteStock) => favoriteStock.symbol !== stock.symbol
        )
      );
    } else {
      setFavoriteStocks([...favoriteStocks, stock]);
    }
  };

  // Find the company name from the companyStocks JSON
  const companyName = companyStocks.find(
    (company) => company.symbol === stock.symbol
  )?.description;

  const capitalize = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <>
      <div className="w-full flex justify-end mb-2">
        {favoriteStocks.some(
          (favoriteStock) => favoriteStock.symbol === stock.symbol
        ) ? (
          <CheckCircleIcon
            className="w-6 h-6 cursor-pointer"
            onClick={handleFavoriteClick}
          />
        ) : (
          <PlusIcon
            className="w-6 h-6 cursor-pointer"
            onClick={handleFavoriteClick}
          />
        )}
      </div>
      <div className="w-full h-30 flex flex-row justify-between items-center pb-4 border-b border-gray-600">
        <div className="flex flex-col">
          <span className="text-4xl font-bold">{stock.symbol}</span>
          <span className="text-md text-gray-400">
            {companyName && capitalize(companyName)}
          </span>
        </div>
        <div className="flex flex-col">
          <span>${stock?.quote.c.toFixed(2)}</span>
          <span
            className={` ${
              stock.quote.d > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {stock.quote.d > 0 ? "+" : ""}
            {stock.quote.d.toFixed(2)}
          </span>
        </div>
      </div>
    </>
  );
};

export default DetailsHeader;
