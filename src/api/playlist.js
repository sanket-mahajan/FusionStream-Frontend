import axiosInstance from "../utils/axiosInstance";

// Create a playlist
export const createPlaylist = async (data) => {
  const response = await axiosInstance.post("/playlist", data);
  return response.data.data;
};

// Get all playlists of a user
export const getUserPlaylists = async (userId) => {
  const response = await axiosInstance.get(`/playlist/user/${userId}`);
  return response.data.data;
};

// Get all video from a playlist
export const getPlaylistById = async (playlistId) => {
  const response = await axiosInstance.get(`/playlist/${playlistId}`);
  return response.data.data;
};

// Update a playlist
export const updatePlaylist = async (playlistId, data) => {
  const response = await axiosInstance.patch(`/playlist/${playlistId}`, data);
  return response.data.data;
};

// Delete a playlist
export const deletePlaylist = async (playlistId) => {
  const response = await axiosInstance.delete(`/playlist/${playlistId}`);
  return response.data;
};

// Add a video to a playlist
export const addVideoToPlaylist = async (playlistId, videoId) => {
  const response = await axiosInstance.patch(
    `playlist/add/${playlistId}/${videoId}`
  );
  return response.data.data;
};
// Remove a video from a playlist
export const removeVideoFromPlaylist = async (playlistId, videoId) => {
  const response = await axiosInstance.patch(
    `playlist/remove/${videoId}/${playlistId}`
  );
  return response.data.data;
};
