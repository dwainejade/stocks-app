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
  stocks: StockItem[] | null;
  getStock: (name?: string) => void;
  symbol: string;
  setSymbol: (symbol: string) => void;
}
