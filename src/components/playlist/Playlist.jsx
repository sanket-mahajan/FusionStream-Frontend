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
      dispatch(fetchPlaylistById(playlistId));
    }
  }, [playlistId, dispatch]);

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

  const handleVideoClick = (videoId) => {
    navigate(`/videos/${videoId}`);
  };

  const handleUpdate = () => {
    navigate(`/playlist/${playlistId}/update`);
  };

  if (isLoading) {
    return <div className="p-6 text-white">Loading playlist...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load playlist. Please try again.
      </div>
    );
  }

  // Assuming the fetched playlist is returned as an array with one object
  const playlist =
    selectedPlaylist && selectedPlaylist.length > 0
      ? selectedPlaylist[0]
      : null;

  if (!playlist) {
    return <div className="p-6 text-gray-500">No playlist found.</div>;
  }

  return (
    <div className="p-6 bg-gray-900 text-white rounded-md shadow-md max-w-5xl mx-auto">
      {/* Playlist Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-3xl font-bold mb-2 sm:mb-0">{playlist.name}</h1>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Update
          </button>
        </div>
        <p className="text-gray-400 mt-2">{playlist.description}</p>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlist.videos && playlist.videos.length > 0 ? (
          playlist.videos.map((video) => (
            <div
              key={video._id}
              onClick={() => handleVideoClick(video._id)}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {formatDuration(video.duration)}
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{video.title}</h2>
                <p className="text-gray-400 text-sm mt-1">
                  {video.owner.fullName}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">
            No videos available in this playlist.
          </p>
        )}
      </div>
    </div>
  );
};

export default Playlist;
