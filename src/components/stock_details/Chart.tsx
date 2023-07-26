import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import mockData from '../../constants/msftMockData.json';

const transformedData = mockData.t.map((timestamp, index) => ({
  date: new Date(timestamp * 1000).toISOString().split('T')[0], // Convert to date string
  price: mockData.c[index],
}));

// Then use transformedData in your chart

const Chart = () => {
  return (
    <div className="w-full">
      <AreaChart
        width={730}
        height={250}
        data={transformedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" interval={1000} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
};

export default Chart;
