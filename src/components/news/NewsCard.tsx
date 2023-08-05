import { NewsItem } from "../../utils/interfaces";
import moment from "moment";

interface NewsCardProps {
  newsItem: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ newsItem }) => {
  const handleOnClick = () => {
    window.open(newsItem.url, "_blank");
  };

  const formattedDate = moment.unix(newsItem.datetime).fromNow();

  return (
    <div
      className="w-full h-[240px] bg-gray-800 rounded-xl shadow-md flex flex-col cursor-pointer "
      onClick={handleOnClick}
    >
      <div className="w-full flex flex-row justify-between text-sm border-b border-gray-600 h-10 px-4 pt-2">
        {newsItem.source}
        <div className="text-sm text-gray-400">{formattedDate}</div>
      </div>

      {newsItem.image ? (
        <div className="flex flex-row justify-between items-start h-full p-4 gap-4">
          <h2 className="text-lg font-bold">{newsItem.headline}</h2>

          <img
            src={newsItem.image}
            alt={newsItem.headline}
            className="w-40 h-40 object-cover rounded-md"
          />
        </div>
      ) : (
        <div className="h-full flex flex-col justify-evenly items-start p-4 overflow-hidden gap-3">
          <h2 className="w-full text-lg font-bold">{newsItem.headline}</h2>
          <p className="w-full text-gray-300 max-h-100">{newsItem.summary}</p>
        </div>
      )}
    </div>
  );
};

export default NewsCard;
