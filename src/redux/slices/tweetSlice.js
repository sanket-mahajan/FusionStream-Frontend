import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getTweets,
  createTweet,
  getUserTweets,
  updateTweet,
  deleteTweet,
  getTweetById,
} from "../../api/tweet";

// Thunks

// Fetch Tweets
export const fetchTweets = createAsyncThunk(
  "tweets/fetchAll",
  async (queryParams, thunkAPI) => {
    try {
      const query = new URLSearchParams(queryParams).toString();
      const response = await getTweets(`?${query}`);
      return response.tweets; // Assuming response contains { tweets: [...] }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch tweets"
      );
    }
  }
);

// Fetch Tweet By ID
export const fetchTweetById = createAsyncThunk(
  "tweet/fetchById",
  async (tweetId, thunkAPI) => {
    try {
      console.log(tweetId);
      const response = await getTweetById({ tweetId });
      console.log(response.tweet);
      return response.tweet;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch tweets"
      );
    }
  }
);

// Add Tweet
export const addTweet = createAsyncThunk(
  "tweets/add",
  async (data, thunkAPI) => {
    try {
      const response = await createTweet(data);
      return response; // Assuming response contains created tweet
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create tweet"
      );
    }
  }
);

// Get User Tweets
export const fetchUserTweets = createAsyncThunk(
  "tweets/fetchByUser",
  async (userId, thunkAPI) => {
    try {
      const response = await getUserTweets(userId);
      return response.tweets;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch user tweets"
      );
    }
  }
);

// Update Tweet
export const updateUserTweets = createAsyncThunk(
  "tweets/update",
  async ({ tweetId, content }, thunkAPI) => {
    try {
      const response = await updateTweet(tweetId, { content });
      return response; // Assuming response contains updated tweet
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update tweet"
      );
    }
  }
);

// Delete Tweet
export const deleteUserTweets = createAsyncThunk(
  "tweets/delete",
  async (tweetId, thunkAPI) => {
    try {
      const response = await deleteTweet(tweetId);
      return response; // Assuming response contains deleted tweet
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete tweet"
      );
    }
  }
);

// Slice
const tweetSlice = createSlice({
  name: "tweets",
  initialState: {
    tweets: [],
    userTweets: [],
    tweet: null,
    isLoading: false,
    isError: false,
    errorMessage: null,
  },
  reducers: {
    clearTweets: (state) => {
      state.tweets = [];
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tweets
      .addCase(fetchTweets.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(fetchTweets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tweets = action.payload || [];
      })
      .addCase(fetchTweets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Fetch Tweet By ID
      .addCase(fetchTweetById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(fetchTweetById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tweet = action.payload || null;
      })
      .addCase(fetchTweetById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      // Fetch User Tweets
      .addCase(fetchUserTweets.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(fetchUserTweets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userTweets = action.payload || [];
      })
      .addCase(fetchUserTweets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      // Add Tweet
      .addCase(addTweet.fulfilled, (state, action) => {
        // if (action.payload) {
        //   state.tweets.unshift(action.payload); // Add new tweet to the start
        // }
      })

      // Update Tweet
      .addCase(updateUserTweets.fulfilled, (state, action) => {
        const updatedTweet = action.payload;
        const index = state.tweets.findIndex(
          (tweet) => tweet._id === updatedTweet._id
        );
        if (index !== -1) {
          state.tweets[index] = updatedTweet; // Update tweet in the list
        }
      })

      // Delete Tweet
      .addCase(deleteUserTweets.fulfilled, (state, action) => {
        const deletedTweet = action.payload;
        state.tweets = state.tweets.filter(
          (tweet) => tweet._id !== deletedTweet._id
        );
      });
  },
});

// Export actions and reducer
export const { clearTweets } = tweetSlice.actions;
export default tweetSlice.reducer;
