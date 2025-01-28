import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllVideos,
  getVideoById,
  uploadVideo,
  updateVideoDetails,
  deleteVideo,
  getUploadedVideos,
} from "../../api/video"; // Adjust this path if needed

// Thunks

// Fetch all videos
export const fetchAllVideos = createAsyncThunk(
  "videos/fetchAll",
  async (query, thunkAPI) => {
    try {
      return await getAllVideos(query);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Fetch a video by ID
export const fetchVideoById = createAsyncThunk(
  "videos/fetchById",
  async (videoId, thunkAPI) => {
    try {
      return await getVideoById(videoId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Upload a video
export const uploadNewVideo = createAsyncThunk(
  "videos/upload",
  async (data, thunkAPI) => {
    try {
      return await uploadVideo(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update video details
export const updateVideo = createAsyncThunk(
  "videos/updateDetails",
  async ({ videoId, data }, thunkAPI) => {
    try {
      return await updateVideoDetails(videoId, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete a video
export const removeVideo = createAsyncThunk(
  "videos/delete",
  async (videoId, thunkAPI) => {
    try {
      return await deleteVideo(videoId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Get uploaded videos by Owner
export const fetchUploadedVideos = createAsyncThunk(
  "videos/uploadedbyowner",
  async (_, thunkAPI) => {
    try {
      return await getUploadedVideos();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Initial State
const initialState = {
  videos: [], // List of all videos
  owner: "", // Getting this value from findById(user)
  currentVideo: null, // Video details (for viewing or editing)
  isLoading: false,
  isError: false,
  errorMessage: "",
  uploadedVideos: [], // Videos uploaded by the logged in user
};

// Slice
const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    clearVideoState: (state) => {
      state.currentVideo = null;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all videos
      .addCase(fetchAllVideos.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchAllVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = action.payload.videos;
      })
      .addCase(fetchAllVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Error";
      })
      // Fetch video by ID
      .addCase(fetchVideoById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchVideoById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentVideo = action.payload;
      })
      .addCase(fetchVideoById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to fetch video details";
      })
      // Upload video
      .addCase(uploadNewVideo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(uploadNewVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos.push(action.payload); // Add new video to the list
      })
      .addCase(uploadNewVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to upload video";
      })
      // Update video
      .addCase(updateVideo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update the video in the list
        const index = state.videos.findIndex(
          (video) => video._id === action.payload._id
        );
        if (index !== -1) state.videos[index] = action.payload;
      })
      .addCase(updateVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to update video";
      })
      // Delete video
      .addCase(removeVideo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(removeVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove the video from the list
        state.videos = state.videos.filter(
          (video) => video._id !== action.payload._id
        );
      })
      .addCase(removeVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to delete video";
      })
      .addCase(fetchUploadedVideos.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchUploadedVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uploadedVideos = action.payload.videos;
      })
      .addCase(fetchUploadedVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload || "Failed to fetch uploaded videos";
      });
  },
});

export const { clearVideoState } = videoSlice.actions;
export default videoSlice.reducer;
