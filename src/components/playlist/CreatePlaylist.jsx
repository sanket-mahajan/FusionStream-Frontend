import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewPlaylist,
  fetchUserPlaylists,
} from "../../redux/slices/playlistSlice";

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError } = useSelector((state) => state.playlist);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (playlistName.trim() === "") {
      alert("Playlist name is required.");
      return;
    }
    if (description.trim() === "") {
      alert("Description is required.");
      return;
    }

    dispatch(createNewPlaylist({ name: playlistName, description }))
      .unwrap()
      .then(() => {
        // Reset fields after upload
        setPlaylistName("");
        setDescription("");
        dispatch(fetchUserPlaylists(user._id));
      })
      .catch((error) => {
        console.error("Playlist create failed:", error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-md shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold text-white mb-4">Create Playlist</h2>
      <div className="mb-4">
        {isError && (
          <div className="text-red-500">
            Failed to create playlist. Please try again.
          </div>
        )}
        <label
          htmlFor="playlistName"
          className="block text-sm text-gray-300 mb-2"
        >
          Playlist Name
        </label>
        <input
          type="text"
          id="playlistName"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter playlist name"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm text-gray-300 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter playlist description"
          rows="4"
        ></textarea>
      </div>
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-md text-white ${
          isLoading
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create Playlist"}
      </button>
    </form>
  );
};

export default CreatePlaylist;
