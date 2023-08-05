import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { StockContext } from "../../context/StockContext";
import { StocksContextType, NewsItem } from "../../utils/interfaces";
import NewsCard from "./NewsCard";

const NewsList = () => {
  const { news } = useContext(StockContext) as StocksContextType;
  const [loadMore, setLoadMore] = useState(6);
  const loader = useRef<HTMLDivElement | null>(null);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setLoadMore((prev) => prev + 6); // Load 6 news items at a time
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

  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 xlg:grid-cols-3 gap-3"
      variants={variants}
      initial="hidden"
      animate="show"
    >
      {news.slice(0, loadMore).map((newsItem: NewsItem, index: number) => (
        <NewsCard key={index} newsItem={newsItem} />
      ))}
      <div ref={loader} />
    </motion.div>
  );
};

export default NewsList;
