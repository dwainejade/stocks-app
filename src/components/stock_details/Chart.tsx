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

  const formatTick = (tick) => {
    console.log(tick);
    const date = new Date(tick);
    switch (selectedRange) {
      case "1D":
        return ""; // returns the hour
      case "1W":
        return `${date.getMonth() + 1}/${date.getDate()}`; // returns 'M/D'
      case "1M":
        const day = date.getDay();
        if (day === 1) {
          // Check if it's Monday
          return `${date.getMonth() + 1}/${date.getDate()}`; // returns 'M/D'
        } else {
          return "";
        }
      case "1Y":
        return `${date.getMonth() + 1}/${date
          .getFullYear()
          .toString()
          .substr(-2)}`; // returns 'M/YY'
      default:
        return tick;
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
              <stop offset="5%" stopColor="#8884d8" stopOpacity={1} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <XAxis dataKey="date" tickFormatter={formatTick} />

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
            stroke="#8884d8"
            fillOpacity={0.2}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
