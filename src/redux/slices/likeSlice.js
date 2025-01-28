// Thunks

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getLikedVideos,
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
  getLikedComments,
  getLikedTweets,
} from "../../api/like";

// Get Liked videos

export const fetchLikedVideos = createAsyncThunk(
  "likes/fetchAll/videos",
  async (_, thunkAPI) => {
    try {
      return await getLikedVideos();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchLikedTweets = createAsyncThunk(
  "likes/fetchAll/tweets",
  async (_, thunkAPI) => {
    try {
      return await getLikedTweets();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchLikedComments = createAsyncThunk(
  "likes/fetchAll/comments",
  async (_, thunkAPI) => {
    try {
      return await getLikedComments();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Toggle Like video

export const likeVideos = createAsyncThunk(
  "likes/toggleLikeVideo",
  async (videoId, thunkAPI) => {
    try {
      return await toggleVideoLike(videoId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Toggle Like Comment

export const likeComment = createAsyncThunk(
  "likes/toggleLikeComment",
  async (_, thunkAPI) => {
    try {
      return await toggleCommentLike();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Toggle Like Tweet

export const likeTweet = createAsyncThunk(
  "likes/toggleLikeTweet",
  async (tweetId, thunkAPI) => {
    try {
      console.log("Tweet Liked Or Unliked", tweetId);
      return await toggleTweetLike(tweetId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  likedVideos: [], // List of liked videos
  likedComments: [], // List of liked comments
  likedTweets: [], // List of liked tweets
  isLoading: false, // General loading state
  isError: false, // General error state
  errorMessage: "", // To store error messages
  videoLikeStatus: {}, // To track the like status of videos { videoId: true/false }
  commentLikeStatus: {}, // To track the like status of comments { commentId: true/false }
  tweetLikeStatus: {}, // To track the like status of tweets { tweetId: true/false }
};

// Slice

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    clearLikeState: (state) => {
      state.likedVideos = null;
      state.isError = false;
      state.errorMessage = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikedVideos.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchLikedVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likedVideos = action.payload;
      })
      .addCase(fetchLikedVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to fetch liked videos.";
      })
      .addCase(fetchLikedComments.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchLikedComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likedComments = action.payload;
      })
      .addCase(fetchLikedComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload || "Failed to fetch liked Comments.";
      })
      .addCase(fetchLikedTweets.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchLikedTweets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likedTweets = action.payload;
      })
      .addCase(fetchLikedTweets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to fetch liked Tweets.";
      })
      .addCase(likeVideos.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(likeVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        const { videoId, existingLike } = action.payload;
        state.videoLikeStatus[videoId] = existingLike; // Update like status for the video
      })
      .addCase(likeVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload.message || "Failed to toggle like on video.";
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        const { commentId, existingLike } = action.payload;
        state.commentLikeStatus[commentId] = existingLike;
      })
      .addCase(likeTweet.fulfilled, (state, action) => {
        const { tweetId, existingLike } = action.payload;
        state.tweetLikeStatus[tweetId] = existingLike;
      });
  },
});

export const { clearLikeState } = likeSlice.actions;
export default likeSlice.reducer;
