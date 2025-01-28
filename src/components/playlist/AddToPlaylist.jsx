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

  const handleClick = (playlistId, isAlreadyInPlaylist) => {
    if (!isAlreadyInPlaylist) {
      dispatch(
        addVideoToPlaylistById({ playlistId, videoId: currentVideo._id })
      );
    }
  };

  const handleRemove = (playlistId, isAlreadyInPlaylist) => {
    if (isAlreadyInPlaylist) {
      dispatch(
        removeVideoFromPlaylistById({ playlistId, videoId: currentVideo._id })
      );
    }
  };

  const navigateToPlaylist = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
  };

  console.log(playlists);

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md max-w-md mx-auto text-white">
      <h1 className="text-xl font-bold mb-4">Add to Playlist</h1>
      {isLoading && <p className="text-blue-400">Loading playlists...</p>}
      {isError && (
        <p className="text-red-500">
          Failed to load playlists. Please try again.
        </p>
      )}
      {!isLoading && playlists?.length === 0 && (
        <p className="text-gray-400">You don&apos;t have any playlists yet.</p>
      )}
      <ul className="space-y-3">
        {playlists?.map((playlist) => {
          const isAlreadyInPlaylist = playlist.videos.some(
            (video) => video === currentVideo._id
          );
          return (
            <li
              key={playlist._id}
              className={`flex items-center justify-between bg-gray-700 px-4 py-3 rounded-md ${
                isAlreadyInPlaylist
                  ? "cursor-not-allowed"
                  : "hover:bg-gray-600 cursor-pointer"
              }`}
            >
              <span className="text-lg font-medium">{playlist.name}</span>
              <button
                onClick={() => handleClick(playlist._id, isAlreadyInPlaylist)}
                className={`text-sm px-2 py-1 rounded-md ${
                  isAlreadyInPlaylist
                    ? "bg-gray-500 text-gray-300"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                disabled={isAlreadyInPlaylist}
              >
                {isAlreadyInPlaylist ? "Already Added" : "Add"}
              </button>
              {isAlreadyInPlaylist && (
                <button
                  onClick={() =>
                    handleRemove(playlist._id, isAlreadyInPlaylist)
                  }
                  className={`text-sm px-2 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600`}
                >
                  Remove
                </button>
              )}

              <button
                onClick={() => navigateToPlaylist(playlist._id)}
                className="text-sm px-2 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                View Playlist
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AddToPlaylist;
