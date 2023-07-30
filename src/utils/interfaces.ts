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
  lastUpdated: number;
}

export interface StocksContextType {
  stock: StockItem | null;
  getStock: (name?: string) => void;
  symbol: string;
  setSymbol: (symbol: string) => void;
  favoriteStocks: StockItem[];
  setFavoriteStocks: (stocks: StockItem[]) => void;
}
