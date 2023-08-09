import React, { useState, useContext, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StockList from './stock_list/StockList';
import MobileHeader from './MobileHeader';
import DetailsHeader from './stock_details/DetailsHeader';
import Chart from './stock_details/Chart';
import Search from './Search';
import StockInfo from './stock_details/StockInfo';
import { StockContext } from '../context/StockContext';
import { StocksContextType } from '../utils/interfaces';
import NewsList from './news/NewsList';

const StockDashboard: React.FC = () => {
  const { symbol, favoriteStocks, fetchingNews } = useContext(
    StockContext
  ) as StocksContextType;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [symbol]);

  return (
    <div
      className={`${
        windowWidth > 425 ? 'flex' : 'flex-col'
      } h-screen w-screen bg-gray-800 text-gray-50 overflow-x-hidden`}
    >
      {/* Left side with list of stocks */}
      {windowWidth > 425 ? (
        <div className="w-[330px] flex-shrink-0 h-full flex flex-col bg-grey-100">
          <div className="border-b-2 border-gray-600 p-3 bg-gray-800">
            <Search />
          </div>
          <div className="p-3 overflow-y-auto flex-grow">
            <StockList />
          </div>
        </div>
      ) : (
        <MobileHeader />
      )}

      {/* Right side with chart and stock details */}
      <div
        className="flex-grow flex justify-center items-start bg-gray-900 text-gray-50 p-5 overflow-y-auto"
        ref={scrollRef}
      >
        {favoriteStocks.length > 0 || symbol ? (
          <div className="max-w-[900px] flex flex-col items-center justify-center">
            <DetailsHeader />

            {symbol && <Chart />}

            <StockInfo />

            <AnimatePresence>
              {!fetchingNews && (
                <motion.div
                  className="mt-20"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  key={symbol}
                >
                  <NewsList />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="max-w-[900px] flex flex-col h-2/4 items-center justify-center text-3xl">
            Search and add a stock to view its details.
          </div>
        )}
      </div>
    </div>
  );
};

export default StockDashboard;
