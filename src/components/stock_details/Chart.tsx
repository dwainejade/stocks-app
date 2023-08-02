import { useState, useEffect, useContext } from "react";
import {
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { StockContext } from "../../context/StockContext";
import { StocksContextType } from "../../utils/interfaces";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-gray-700 p-2 rounded text-white">
        <p className="label">{`Date : ${label}`}</p>
        <p className="intro">{`Price : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const Chart = () => {
  const { stock, ranges, selectedRange, setSelectedRange } = useContext(
    StockContext
  ) as StocksContextType;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const calculateInterval = (selectedRange, dataLength) => {
    switch (selectedRange) {
      case "1D":
        return Math.floor(dataLength / 24);
      case "1W":
        return Math.floor(dataLength / 7);
      case "1M":
        return Math.floor(dataLength / 4);
      case "1Y":
        return Math.floor(dataLength / 12);
      default:
        return 0;
    }
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
  };

  // Determine the color of the graph based on the opening and current prices
  const graphColor =
    stock &&
    stock.prices[0].price <= stock?.prices[stock.prices.length - 1].price
      ? "#018E42"
      : "#BB0A21";

  return (
    <div>
      <div className="flex justify-between">
        {stock &&
          ranges.map((range) => (
            <button
              key={range}
              className={`px-4 py-1 text-white rounded focus:ring-opacity-50 ${
                selectedRange === range ? "bg-gray-700" : null
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
          data={stock?.prices}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={graphColor} stopOpacity={1} />
              <stop offset="95%" stopColor={graphColor} stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <XAxis dataKey="date" interval={calculateInterval} />

          <YAxis
            type="number"
            domain={[
              (dataMin: number) => Math.floor(dataMin) - 1,
              (dataMax: number) => Math.floor(dataMax) + 1,
            ]}
            orientation="right"
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="price"
            stroke={graphColor}
            strokeWidth={1.5}
            fillOpacity={0.3}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
