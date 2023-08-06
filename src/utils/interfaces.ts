import { TooltipPayload } from 'recharts';
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
  prices: { price: number; date: string }[];
  lastUpdated: number;
}

export interface CompareStocksType {
  date: string;
  [symbol: string]: number | string;
}

export interface SearchResult {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export interface StocksContextType {
  stock: StockItem | null;
  getStock: (name?: string) => void;
  symbol: string;
  setSymbol: (symbol: string) => void;
  favoriteStocks: StockItem[];
  setFavoriteStocks: (stocks: StockItem[]) => void;
  compareStocks: CompareStocksType[];
  setCompareStocks: (stocks: CompareStocksType[]) => void;
  comparingStocksSymbols: string[];
  ranges: string[];
  selectedRange: string;
  setSelectedRange: (selectedRange: string) => void;
  searchStock: (query: string) => Promise<SearchResult[]>;
  getCompareStocksInfo: () => void;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}
