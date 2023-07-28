export interface StockItem {
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
  prices: number[];
}

export interface StocksContextType {
  stocks: StockItem[];
  getStock: (name?: string) => void;
}
