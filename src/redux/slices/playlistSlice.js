import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
} from "../../api/playlist";

// Thunks

// Create a new playlist
export const createNewPlaylist = createAsyncThunk(
  "playlists/create",
  async (data, thunkAPI) => {
    try {
      return await createPlaylist(data);
    } catch (isError) {
      return thunkAPI.rejectWithValue(isError.response.data);
    }
  }
);

// Fetch all playlists of a user
export const fetchUserPlaylists = createAsyncThunk(
  "playlists/fetchAll",
  async (data, thunkAPI) => {
    try {
      return await getUserPlaylists(data);
    } catch (isError) {
      return thunkAPI.rejectWithValue(isError.response.data);
    }
  }
);

// Fetch a playlist by ID
export const fetchPlaylistById = createAsyncThunk(
  "playlists/fetchById",
  async (playlistId, thunkAPI) => {
    try {
      return await getPlaylistById(playlistId);
    } catch (isError) {
      return thunkAPI.rejectWithValue(isError.response.data);
    }
  }
);

// Update playlist details
export const updatePlaylistDetails = createAsyncThunk(
  "playlists/updateDetails",
  async ({ playlistId, data }, thunkAPI) => {
    try {
      return await updatePlaylist(playlistId, data);
    } catch (isError) {
      return thunkAPI.rejectWithValue(isError.response.data);
    }
  }
);

// Delete a playlist
export const deletePlaylistById = createAsyncThunk(
  "playlists/delete",
  async (playlistId, thunkAPI) => {
    try {
      return await deletePlaylist(playlistId);
    } catch (isError) {
      return thunkAPI.rejectWithValue(isError.response.data);
    }
  }
);

// Add a video to a playlist
export const addVideoToPlaylistById = createAsyncThunk(
  "playlists/addVideo",
  async ({ playlistId, videoId }, thunkAPI) => {
    try {
      return await addVideoToPlaylist(playlistId, videoId);
    } catch (isError) {
      return thunkAPI.rejectWithValue(isError.response.data);
    }
  }
);

// Remove a video from a playlist
export const removeVideoFromPlaylistById = createAsyncThunk(
  "playlists/removeVideo",
  async ({ playlistId, videoId }, thunkAPI) => {
    try {
      return await removeVideoFromPlaylist(playlistId, videoId);
    } catch (isError) {
      return thunkAPI.rejectWithValue(isError.response.data);
    }
  }
);

// Slice
const playlistSlice = createSlice({
  name: "playlists",
  initialState: {
    playlists: [],
    selectedPlaylist: null,
    isLoading: false,
    isError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewPlaylist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewPlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playlists.push(action.payload);
      })
      .addCase(createNewPlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(fetchUserPlaylists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserPlaylists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playlists = action.payload;
      })
      .addCase(fetchUserPlaylists.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(fetchPlaylistById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPlaylistById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedPlaylist = [action.payload];
      })
      .addCase(fetchPlaylistById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(updatePlaylistDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePlaylistDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playlists = state.playlists.map((playlist) =>
          playlist._id === action.payload._id ? action.payload : playlist
        );
      })
      .addCase(updatePlaylistDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(deletePlaylistById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePlaylistById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playlists = state.playlists.filter(
          (playlist) => playlist._id !== action.payload._id
        );
      })
      .addCase(deletePlaylistById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(addVideoToPlaylistById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addVideoToPlaylistById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playlists = state.playlists.map((playlist) =>
          playlist._id === action.payload._id ? action.payload : playlist
        );
      })
      .addCase(addVideoToPlaylistById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(removeVideoFromPlaylistById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeVideoFromPlaylistById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playlists = state.playlists.map((playlist) =>
          playlist._id === action.payload._id ? action.payload : playlist
        );
      })
      .addCase(removeVideoFromPlaylistById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const playlistActions = playlistSlice.actions;
export default playlistSlice.reducer;
