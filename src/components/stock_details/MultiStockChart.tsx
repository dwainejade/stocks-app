import { useState, useEffect, useContext } from 'react';
import Search from '../Search';
import {
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import { StockContext } from '../../context/StockContext';
import { StocksContextType, CustomTooltipProps } from '../../utils/interfaces';

const MultiStockChart = () => {
  const {
    stock,
    ranges,
    selectedRange,
    setSelectedRange,
    compareStocks,
    comparingStocksSymbols,
    removeComparisonStock,
  } = useContext(StockContext) as StocksContextType;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showFavorites, setShowFavorites] = useState(false);
  console.log('data', compareStocks, comparingStocksSymbols);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
  };

  const dateFormatter = (timestamp: string) => {
    if (selectedRange === '1Y') {
      return timestamp.split(' ')[0];
    } else if (selectedRange === '1M') {
      return timestamp
        .split(' ')[1]
        .slice(0, timestamp.split(' ')[1].length - 1);
    } else if (selectedRange === '1W') {
      return timestamp
        .split(' ')[1]
        .slice(0, timestamp.split(' ')[1].length - 1);
    } else if (selectedRange === '1D') {
      return timestamp.split(' ')[4].split(':')[0];
    }
    return '';
  };

  const renderCustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      const date = label;
      const price = payload[0].value;

      return (
        <div
          style={{
            backgroundColor: '#f5f5f5',
            padding: '10px',
            border: '1px solid #ccc',
          }}
        >
          {/* Black text for the date */}
          <p
            style={{ color: 'black', marginBottom: '5px' }}
          >{`Date: ${date}`}</p>
          {/* Purple text for the price */}
          {comparingStocksSymbols.map((option, i) => (
            <p
              key={i}
              style={{ color: 'black', marginBottom: '0' }}
            >{`${option}: ${price}`}</p>
          ))}
        </div>
      );
    }

    return null;
  };

  // Determine the color of the graph based on the opening and current prices
  const graphColor =
    stock &&
    stock.prices[0].price <= stock?.prices[stock.prices.length - 1].price
      ? '#018E42'
      : '#BB0A21';

  const lineColors: string[] = ['#0079FF', '#F6FA70', '#FF0060', '#00DFA2'];

  return (
    <div>
      {compareStocks.length > 0 && (
        <div className="mb-2">
          <button
            className={`px-2 py-1 mr-2 text-white rounded focus:ring-opacity-50 border border-sky-500`}
            onClick={() => setShowFavorites(!showFavorites)}
          >
            Comparison +
          </button>
          {comparingStocksSymbols.length > 1 &&
            comparingStocksSymbols.map((symbol: string, i: number) => (
              <span
                key={i}
                id="badge-dismiss-default"
                className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
                onClick={() => removeComparisonStock(symbol)}
              >
                {symbol}
                <button
                  type="button"
                  className="inline-flex items-center p-1 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                  data-dismiss-target="#badge-dismiss-default"
                  aria-label="Remove"
                >
                  <svg
                    className="w-2 h-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Remove badge</span>
                </button>
              </span>
            ))}

          {showFavorites && <Search inChart={true} />}
        </div>
      )}
      <div className="flex justify-between">
        {compareStocks.length > 0 &&
          ranges.map((range) => (
            <button
              key={range}
              className={`px-4 py-1 text-white rounded focus:ring-opacity-50 ${
                selectedRange === range ? 'bg-gray-700' : null
              }`}
              onClick={() => handleRangeChange(range)}
            >
              {range}
            </button>
          ))}
      </div>
      <ResponsiveContainer
        width={windowWidth - 450 > 800 ? 800 : windowWidth - 450}
        height={250}
      >
        <AreaChart
          data={compareStocks}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            {comparingStocksSymbols.map((option, i) => (
              <linearGradient
                id={`color${option}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
                key={i}
              >
                <stop
                  offset="5%"
                  stopColor={
                    comparingStocksSymbols.length === 1
                      ? graphColor
                      : lineColors[i]
                  }
                  stopOpacity={1}
                />
                <stop
                  offset="95%"
                  stopColor={
                    comparingStocksSymbols.length === 1
                      ? graphColor
                      : lineColors[i]
                  }
                  stopOpacity={0.2}
                />
              </linearGradient>
            ))}
          </defs>
          <XAxis dataKey="date" tickFormatter={dateFormatter} interval={30} />
          <YAxis
            type="number"
            domain={[
              (dataMin: number) => Math.floor(dataMin) - 1,
              (dataMax: number) => Math.floor(dataMax) + 1,
            ]}
            orientation="right"
          />
          <Tooltip content={renderCustomTooltip} />
          {comparingStocksSymbols.length &&
            comparingStocksSymbols.map((symbol, i) => (
              <Area
                key={i}
                type="monotone"
                dataKey={symbol}
                stroke={
                  comparingStocksSymbols.length === 1
                    ? graphColor
                    : lineColors[i]
                }
                strokeWidth={1}
                fillOpacity={0.3}
                fill={`url(#color${symbol})`}
              />
            ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MultiStockChart;
