import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserPlaylists,
  deletePlaylistById,
} from "../redux/slices/playlistSlice";
import CreatePlaylist from "../components/playlist/CreatePlaylist";

const PlaylistPage = () => {
  const { user } = useSelector((state) => state.auth);
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

  const onPlaylistCreated = ({ playListId }) => {
    navigate(`/playlist/${playListId}`);
  };

  const onPlayListClick = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
  };

  const onPlayListDelete = (playlistId) => {
    dispatch(deletePlaylistById(playlistId)).then(() => {
      dispatch(fetchUserPlaylists(user._id)); // Refresh playlists
    });
  };

  return (
    <div className="container mx-auto p-6">
      <CreatePlaylist onPlaylistCreated={onPlaylistCreated} />
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-10 text-white">
        <h2 className="text-2xl font-bold mb-6">Your Playlists</h2>
        {isLoading && <p className="text-blue-400">Loading playlists...</p>}
        {isError && (
          <p className="text-red-500">
            Failed to load playlists. Please try again.
          </p>
        )}
        {!isLoading && playlists?.length === 0 && (
          <p className="text-gray-400">
            You don&apos;t have any playlists yet.
          </p>
        )}
        <ul className="divide-y divide-gray-700">
          {playlists &&
            playlists.map((playlist) => (
              <li
                key={playlist._id}
                className="flex justify-between items-center py-4"
              >
                <span className="text-lg font-medium">{playlist.name}</span>
                <div className="flex space-x-3">
                  <button
                    onClick={() => onPlayListClick(playlist._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onPlayListDelete(playlist._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PlaylistPage;
