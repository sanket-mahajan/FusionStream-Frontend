import { useDispatch, useSelector } from "react-redux";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { useEffect } from "react";
import { fetchLikedVideos } from "../../redux/slices/likeSlice";

const LikedVideos = ({ onVideoClick }) => {
  const dispatch = useDispatch();
  const { likedVideos, isLoading, isError } = useSelector(
    (state) => state.like
  );

  useEffect(() => {
    dispatch(fetchLikedVideos());
  }, [dispatch]);

  if (isLoading) return <div className="text-white">Loading videos...</div>;
  if (isError)
    return (
      <div className="text-red-500">
        <ErrorHandler />
      </div>
    );

  return (
    <div>
      <h1 className="text-2xl text-white font-bold mb-4">Liked Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 relative">
        {Array.isArray(likedVideos) && likedVideos.length > 0 ? (
          likedVideos.map(({ video }) => (
            <div
              key={video._id}
              onClick={() => onVideoClick(video._id)}
              className="p-4 bg-gray-800 rounded-md shadow-md hover:cursor-pointer hover:bg-gray-700 relative"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-lg text-white font-bold mt-2">
                {video.title}
              </h2>
              <p className="text-gray-400 text-sm">{video.description}</p>
            </div>
          ))
        ) : (
          <div className="text-white">No videos available.</div>
        )}
      </div>
    </div>
  );
};

export default LikedVideos;
