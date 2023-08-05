import { useContext } from "react";
import { StockContext } from "../../context/StockContext";
import { StocksContextType, NewsItem } from "../../utils/interfaces";
import NewsCard from "./NewsCard";

const NewsList = () => {
  const { news } = useContext(StockContext) as StocksContextType;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xlg:grid-cols-3 gap-3">
      {news.map((newsItem: NewsItem, index: number) => (
        <NewsCard key={index} newsItem={newsItem} />
      ))}
    </div>
  );
};

export default NewsList;
