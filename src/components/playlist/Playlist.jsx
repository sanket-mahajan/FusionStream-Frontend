import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPlaylistById } from "../../redux/slices/playlistSlice";

const Playlist = ({ onPlayListClick }) => {
  const { selectedPlaylist, isLoading, isError } = useSelector(
    (state) => state.playlist
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { playlistId } = useParams();

  useEffect(() => {
    if (playlistId) {
      dispatch(fetchPlaylistById(playlistId)); // Ensure playlistId is valid before dispatching
    }
  }, [playlistId, dispatch]); // Remove unnecessary dependencies like a nested function

  const handleVideoClick = (videoId) => {
    navigate(`/videos/${videoId}`);
  };

  const handleUpdate = () => {
    navigate(`/playlist/${playlistId}/update`);
  };

  if (isLoading) {
    return <div className="text-white">Loading playlist...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Failed to load playlist. Please try again.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white rounded-md shadow-md max-w-4xl mx-auto">
      {selectedPlaylist && selectedPlaylist.length > 0 ? (
        <>
          <h1 className="text-3xl font-bold mb-4">
            {selectedPlaylist[0].name}
          </h1>
          <button
            onClick={handleUpdate} // Avoid shadowing variable `update`
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
          >
            Update
          </button>
          <p className="text-gray-400 mb-6">
            {selectedPlaylist[0].description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {selectedPlaylist.map(({ _id, videos }) => (
              <div
                key={_id}
                className="bg-gray-800 p-4 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
              >
                {videos.length > 0 ? (
                  videos.map((video) => (
                    <div
                      key={video._id}
                      onClick={() => handleVideoClick(video._id)}
                      className="relative p-4 bg-gray-800 rounded-md shadow-md hover:cursor-pointer hover:bg-gray-700"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      <h2 className="text-lg text-white font-bold mt-2">
                        {video.title}
                      </h2>
                      <p className="text-gray-400 text-sm mt-2">
                        {video.owner.fullName}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No videos available in this playlist.
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500">No playlist found.</p>
      )}
    </div>
  );
};

export default Playlist;
