import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLikedVideos } from "../../redux/slices/likeSlice";
import { HeartIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import LoadingSpinner from "../layout/common/LoadingSpinner";

const LikedVideos = ({ onVideoClick }) => {
  const dispatch = useDispatch();
  const { likedVideos, isLoading, isError } = useSelector(
    (state) => state.like
  );

  useEffect(() => {
    dispatch(fetchLikedVideos());
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
          <div className="text-4xl mb-4">💔</div>
          <h2 className="text-xl font-semibold mb-2">
            Failed to load liked videos
          </h2>
          <button
            onClick={() => dispatch(fetchLikedVideos())}
            className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
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
          <HeartIcon className="h-8 w-8 inline-block mr-3 text-pink-500" />
          Liked Videos
        </h1>
        <span className="text-gray-400 text-sm">
          {likedVideos.length} {likedVideos.length === 1 ? "video" : "videos"}{" "}
          loved
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {likedVideos?.length > 0 ? (
          likedVideos.map(({ video }) => (
            <div
              key={video?._id}
              className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => onVideoClick(video?._id)}
            >
              {/* Thumbnail with duration overlay */}
              <div className="relative">
                <img
                  src={video?.thumbnail}
                  alt={video?.title}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md">
                  {formatDuration(video?.duration)}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-white truncate mb-2">
                  {video?.title}
                </h3>
                <div className="text-gray-400 text-sm mb-3 line-clamp-2 relative">
                  {video?.description}
                  <div className="absolute bottom-0 right-0 w-1/2 h-6 bg-gradient-to-l from-gray-800 via-gray-800/90 to-transparent" />
                </div>

                {/* Liked time */}
                <div className="flex items-center text-pink-400 text-xs">
                  <HeartIcon className="w-4 h-4 mr-1" />
                  Liked {moment(video?.createdAt).fromNow()}
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium">
                  Watch Now
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full py-12">
            <HeartIcon className="h-16 w-16 mx-auto text-pink-500/30 mb-4" />
            <div className="text-gray-400 text-lg mb-2">
              No liked videos yet
            </div>
            <div className="text-sm text-gray-500">
              Videos you like will appear here
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedVideos;
