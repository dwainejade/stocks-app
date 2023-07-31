import { useContext, useState } from "react";
import { StockContext } from "../context/StockContext";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/solid";

interface SearchResult {
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
      setSearchResults(results.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
            <XCircleIcon className="h-6 w-6 text-gray-400 " />
          </span>
        )}
      </form>

      <div className="absolute w-full mt-2 bg-gray-400 rounded shadow-lg">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          searchResults?.map((result, index) => (
            <div
              key={index}
              className={`px-4 py-2 border-b border-gray-700 last:border-b-0`}
            >
              {result.description}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StockSearch;
