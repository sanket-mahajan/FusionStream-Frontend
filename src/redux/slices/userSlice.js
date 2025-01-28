import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getUserWatchHistory,
  updateWatchHistory,
} from "../../api/auth";

// User Methods
// Avatar Update
export const avatar = createAsyncThunk(
  "user/update-avatar",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateUserAvatar(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Cover-Image Update
export const coverImage = createAsyncThunk(
  "user/update-cover-image",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateUserCoverImage(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// User Channel Profile
export const userChannelProfile = createAsyncThunk(
  "user/channel-profile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getUserChannelProfile(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// User Watch History

export const userWatchHistory = createAsyncThunk(
  "user/watch-history",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserWatchHistory();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Watch History

export const updateUserWatchHistory = createAsyncThunk(
  "user/update-watch-history",
  async (videoId, thunkAPI) => {
    try {
      return await updateWatchHistory(videoId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// **User Slice**

// Initial State
const initialState = {
  userProfile: {
    fullName: "",
    username: "",
    subscribersCount: 0,
    channelSubscribedToCount: 0,
    isSubscribed: false,
    avatar: "",
    coverImage: "",
    email: "",
  },
  watchHistory: [],
  avatar: null,
  coverImage: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.userProfile = null;
      state.watchHistory = [];
      state.avatar = null;
      state.coverImage = null;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Avatar Update
      .addCase(avatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(avatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.avatar = action.payload; // Update avatar data
        state.isError = false;
      })
      .addCase(avatar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to update avatar.";
      })
      // Cover Image Update
      .addCase(coverImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(coverImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coverImage = action.payload; // Update cover image data
        state.isError = false;
      })
      .addCase(coverImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to update cover image.";
      })
      // User Channel Profile
      .addCase(userChannelProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userChannelProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProfile = {
          ...state.userProfile,
          ...action.payload, // Overwrite userProfile with the returned data
        };
        state.isError = false;
      })
      .addCase(userChannelProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload || "Failed to fetch user channel profile.";
      })
      // User Watch History
      .addCase(userWatchHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userWatchHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.watchHistory = action.payload; // Update watch history
        state.isError = false;
      })
      .addCase(userWatchHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload || "Failed to fetch user watch history.";
      })
      .addCase(updateUserWatchHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserWatchHistory.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(updateUserWatchHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload || "Failed to update watch history.";
      });
  },
});

// Export Reducers & Actions
export const { clearAuthState } = userSlice.actions;
export default userSlice.reducer;
