import { TooltipPayload } from "recharts";
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

export interface SearchResult {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

export interface companySymbols {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  isin: string;
  mic: string;
  shareClassFIGI: string;
  symbol: string;
  symbol2: string;
  type: string;
}

interface NewsItem {
  category: string;
  datetime: number;
  headline: string;
  id: string;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

export interface StocksContextType {
  stock: StockItem | null;
  getStock: (name?: string) => void;
  symbol: string;
  setSymbol: (symbol: string) => void;
  favoriteStocks: StockItem[];
  setFavoriteStocks: (stocks: StockItem[]) => void;
  ranges: string[];
  selectedRange: string;
  setSelectedRange: (selectedRange: string) => void;
  searchStock: (query: string) => Promise<SearchResult[]>;
  news: NewsItem[];
  getNews: (symbol: string, from: string, to: string) => void;
}
