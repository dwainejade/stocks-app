import { useContext, useState } from "react";
import { StockContext } from "../context/StockContext";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/solid";

const StockSearch = () => {
  const { setSymbol } = useContext(StockContext);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSymbol(inputValue);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full mt-5 relative"
    >
      <span className="absolute pl-3 text-gray-400">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </span>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search"
        className="shadow appearance-none border rounded-2xl w-full py-2 pl-10 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <span
        className="absolute right-0 pr-2 text-gray-400 cursor-pointer"
        onClick={() => setInputValue("")}
      >
        <XCircleIcon className="h-6 w-6 text-gray-400 " />
      </span>
    </form>
  );
};

export default StockSearch;
