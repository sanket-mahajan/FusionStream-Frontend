import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchUserPlaylists,
  addVideoToPlaylistById,
  removeVideoFromPlaylistById,
} from "../../redux/slices/playlistSlice";
import { useNavigate } from "react-router-dom";

const AddToPlaylist = () => {
  const { user } = useSelector((state) => state.auth);
  const { currentVideo } = useSelector((state) => state.video);
  const { playlists, isLoading, isError } = useSelector(
    (state) => state.playlist
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserPlaylists(user._id));
    }
  }, [dispatch, user]);

  const handleAdd = (playlistId, isAlreadyAdded) => {
    if (!isAlreadyAdded) {
      dispatch(
        addVideoToPlaylistById({ playlistId, videoId: currentVideo._id })
      );
    }
  };

  const handleRemove = (playlistId, isAlreadyAdded) => {
    if (isAlreadyAdded) {
      dispatch(
        removeVideoFromPlaylistById({ playlistId, videoId: currentVideo._id })
      );
    }
  };

  const navigateToPlaylist = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md max-w-md mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">Add to Playlist</h1>
      {isLoading && <p className="text-blue-400">Loading playlists...</p>}
      {isError && (
        <p className="text-red-500">
          Failed to load playlists. Please try again.
        </p>
      )}
      {!isLoading && playlists?.length === 0 && (
        <p className="text-gray-400">You don't have any playlists yet.</p>
      )}
      <ul className="space-y-4 mt-4">
        {playlists?.map((playlist) => {
          const isAlreadyAdded = playlist.videos.some(
            (video) => video === currentVideo._id
          );
          return (
            <li
              key={playlist._id}
              className="bg-gray-700 px-4 py-3 rounded-md flex flex-col sm:flex-row sm:items-center justify-between"
            >
              <span className="text-lg font-medium">{playlist.name}</span>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                {isAlreadyAdded ? (
                  <button
                    onClick={() => handleRemove(playlist._id, isAlreadyAdded)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-md text-sm font-medium"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => handleAdd(playlist._id, isAlreadyAdded)}
                    className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded-md text-sm font-medium"
                  >
                    Add
                  </button>
                )}
                <button
                  onClick={() => navigateToPlaylist(playlist._id)}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded-md text-sm font-medium"
                >
                  View
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AddToPlaylist;
