import { useContext, useState } from "react";
import { StockContext } from "../context/StockContext";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/solid";

interface SearchResult {
  symbol: string;
  description: string;
}

const StockSearch = () => {
  const { setSymbol, searchStock } = useContext(StockContext);
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchStock(inputValue);
      const filteredResults = results.result.filter(
        (result) => result.type === "Common Stock"
      );
      setSearchResults(filteredResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectedResult = (symbol: string) => {
    setSymbol(symbol);
    setInputValue("");
    setSearchResults([]);
  };

  console.log(searchResults);

  return (
    <div className="relative w-full">
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
          className="border border-gray-400 rounded-2xl w-full py-2 pl-10 pr-10 text-gray-50  bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
        />

        {inputValue && (
          <span
            className="absolute right-0 pr-2 text-gray-400 cursor-pointer"
            onClick={() => setInputValue("")}
          >
            <XCircleIcon className="h-6 w-6 text-gray-400" />
          </span>
        )}
      </form>
      {inputValue && searchResults && (
        <div className="absolute w-full max-h-[500px] mt-3 rounded-md shadow-lg overflow-y-auto bg-gray-900 px-2 hover:cursor-pointer">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            searchResults?.map((result, index) => (
              <div
                key={index}
                className="px-4 py-2 border-b border-gray-800 last:border-0"
                onClick={() => handleSelectedResult(result.symbol)}
              >
                <p className="font-bold">{result.symbol}</p>
                <p className="text-gray-500 text-xs">{result.description}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default StockSearch;