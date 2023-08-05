import { useContext, useEffect, useRef, useState } from "react";
import { StockContext } from "../../context/StockContext";
import { StocksContextType, NewsItem } from "../../utils/interfaces";
import NewsCard from "./NewsCard";

const NewsList = () => {
  const { news } = useContext(StockContext) as StocksContextType;
  const [loadMore, setLoadMore] = useState(6); // Load 10 news items at a time
  const loader = useRef<HTMLDivElement | null>(null);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setLoadMore((prev) => prev + 6);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xlg:grid-cols-3 gap-3">
      {news.slice(0, loadMore).map((newsItem: NewsItem, index: number) => (
        <NewsCard key={index} newsItem={newsItem} />
      ))}
      <div ref={loader} />
    </div>
  );
};

export default NewsList;
