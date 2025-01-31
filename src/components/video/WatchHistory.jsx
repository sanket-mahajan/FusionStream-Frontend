import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userWatchHistory } from "../../redux/slices/userSlice";
import { ClockIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "../layout/common/LoadingSpinner";

const WatchHistory = ({ onVideoClick }) => {
  const dispatch = useDispatch();
  const { watchHistory, isLoading, isError } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(userWatchHistory());
  }, [dispatch]);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );

  if (isError)
    return (
      <div className="text-red-500 text-center py-8">
        <div className="max-w-md mx-auto">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">
            Failed to load watch history
          </h2>
          <button
            onClick={() => dispatch(userWatchHistory())}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">
          <ClockIcon className="h-8 w-8 inline-block mr-3 text-blue-400" />
          Watch History
        </h1>
        <span className="text-gray-400 text-sm">
          {watchHistory.length} videos watched
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {watchHistory.map((video) => (
          <div
            key={video._id}
            className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            onClick={() => onVideoClick(video._id)}
          >
            {/* Thumbnail with duration overlay */}
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md">
                {formatDuration(video.duration)}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-white truncate mb-2">
                {video.title}
              </h3>
              <div className="text-gray-400 text-sm mb-3 line-clamp-2 relative">
                {video.description}
                <div className="absolute bottom-0 right-0 w-1/2 h-6 bg-gradient-to-l from-gray-800 via-gray-800/90 to-transparent" />
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium">
                Watch Again
              </span>
            </div>
          </div>
        ))}
      </div>

      {watchHistory.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">
            No watch history available
          </div>
          <div className="text-sm text-gray-500">
            Videos you watch will appear here
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchHistory;
