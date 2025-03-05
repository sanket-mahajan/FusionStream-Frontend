import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllVideos } from "../../redux/slices/videoSlice";
import { formatDistanceToNow } from "date-fns";
import LoadingSpinner from "../layout/common/LoadingSpinner";

const VideoList = ({ onVideoClick }) => {
  const dispatch = useDispatch();
  const { videos, isLoading, isError, errorMessage } = useSelector(
    (state) => state.video
  );

  const formatDuration = (durationInSeconds) => {
    const totalSeconds = Math.floor(durationInSeconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;
    } else {
      return `${minutes}:${String(seconds).padStart(2, "0")}`;
    }
  };

  useEffect(() => {
    dispatch(fetchAllVideos());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );

  if (isError) {
    console.log(errorMessage);
    return (
      <div className="text-red-500 text-center py-4">
        Failed to load videos. Please try again later.
        {errorMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {Array.isArray(videos) && videos.length > 0 ? (
        videos.map((video) => (
          <div
            key={video._id}
            onClick={() => onVideoClick(video._id)}
            className="relative bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:cursor-pointer hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Video Thumbnail */}
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              {/* Video Duration */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md">
                {formatDuration(video.duration)}
              </div>
            </div>
            {/* Video Details */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-white truncate">
                {video.title}
              </h2>
              <p className="text-sm text-gray-400 mt-1 truncate">
                {video.owner.fullName}
              </p>
              <div className="text-sm text-gray-400 mt-2 flex justify-between items-center">
                <span>{video.views} views</span>
                <span>
                  {formatDistanceToNow(new Date(video.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-white text-center py-4">No videos available.</div>
      )}
    </div>
  );
};

export default VideoList;
