interface StockData {
  symbol: string;
  quote: {
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
  };
}

export const mockListData: StockData[] = [
  {
    symbol: "AAPL",
    quote: {
      c: 261.74,
      d: 0.545,
      dp: 0.2827,
      h: 263.31,
      l: 260.68,
      o: 261.07,
      pc: 259.45,
      t: 1582641000,
    },
  },
  {
    symbol: "MSFT",
    quote: {
      c: 346.25,
      d: 1.14,
      dp: 0.3303,
      h: 348.32,
      l: 345.07,
      o: 347.11,
      pc: 345.11,
      t: 1690297061,
    },
  },
  {
    symbol: "NFLX",
    quote: {
      c: 428.3719,
      d: 0.0019,
      dp: 0.0004,
      h: 430.82,
      l: 426.13,
      o: 427.18,
      pc: 428.37,
      t: 1690297226,
    },
  },
  {
    symbol: "WMT",
    quote: {
      c: 159.1,
      d: -0.2,
      dp: -0.1255,
      h: 160.5001,
      l: 158.46,
      o: 160.46,
      pc: 159.3,
      t: 1690297248,
    },
  },
  {
    symbol: "META",
    quote: {
      c: 293.08,
      d: 1.47,
      dp: 0.5041,
      h: 298.3,
      l: 291.92,
      o: 295.19,
      pc: 291.61,
      t: 1690297428,
    },
  },
];
