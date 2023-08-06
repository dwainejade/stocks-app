import { useContext, useState } from 'react';
import { StockContext } from '../context/StockContext';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/solid';
import companyStocks from '../constants/companySymbols.json';

interface SearchResult {
  symbol: string;
  description: string;
}

const StockSearch = ({ inChart }) => {
  const {
    setSymbol,
    searchStock,
    comparingStocksSymbols,
    getCompareStocksInfo,
  } = useContext(StockContext);
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const searchLocalCompanies = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    return companyStocks.filter(
      (company) =>
        company.symbol.toLowerCase().includes(lowerCaseQuery) ||
        company.description.toLowerCase().includes(lowerCaseQuery)
    );
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // First, search the local JSON file
      const localResults = searchLocalCompanies(inputValue);

      // If local results are found, use them
      if (localResults.length > 0) {
        setSearchResults(localResults);
      } else {
        // If no local results are found, fall back to the API search
        const results = await searchStock(inputValue);
        const filteredResults = results.result.filter(
          (result) => result.type === 'Common Stock'
        );
        setSearchResults(filteredResults);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectedResult = (symbol: string) => {
    if (inChart) {
      getCompareStocksInfo([...comparingStocksSymbols, symbol]);
    } else {
      setSymbol(symbol);
    }
    setInputValue('');
    setSearchResults([]);
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSearch}
        className="flex items-center w-full relative"
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
            onClick={() => setInputValue('')}
          >
            <XCircleIcon className="h-6 w-6 text-gray-400" />
          </span>
        )}
      </form>
      {inputValue && searchResults && (
        <div
          className={`${
            inChart && 'z-10'
          } absolute w-full max-h-[500px] mt-3 rounded-md shadow-lg overflow-y-auto bg-gray-900 px-2 hover:cursor-pointer`}
        >
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
