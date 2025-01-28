import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userWatchHistory } from "../../redux/slices/userSlice";

const WatchHistory = ({ onVideoClick }) => {
  const dispatch = useDispatch();
  const { watchHistory, isLoading, isError } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    dispatch(userWatchHistory());
  }, [dispatch]);

  if (isLoading)
    return <div className="text-white">Loading watch history...</div>;
  if (isError)
    return <div className="text-red-500">Failed to load history.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-4">Watch History</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {watchHistory.map((video) => (
          <div
            key={video._id}
            onClick={() => onVideoClick(video._id)}
            className="p-4 bg-gray-800 rounded-md shadow-md hover:cursor-pointer hover:bg-gray-700"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-lg text-white font-bold mt-2">{video.title}</h2>
            <p className="text-gray-400 text-sm">{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchHistory;
