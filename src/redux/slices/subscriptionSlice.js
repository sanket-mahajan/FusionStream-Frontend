import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  toggleSubscription,
  getSubscribedChannels,
  getChannelSubscribers,
} from "../../api/subscription";

// **Async Thunks**: Handle API calls with loading states

// Toggle Subscription
export const toggleSubscribe = createAsyncThunk(
  "subscribe/toggle",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await toggleSubscription(channelId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Subscribed Channels
export const fetchSubscribedChannels = createAsyncThunk(
  "subscribe/subscribedChannels",
  async (subscriberId, { rejectWithValue }) => {
    try {
      const response = await getSubscribedChannels(subscriberId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Channel Subscribers
export const fetchChannelSubscribers = createAsyncThunk(
  "subscribe/channelSubscribers",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await getChannelSubscribers(channelId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial State
const initialState = {
  subscribedChannels: [],
  channelSubscribers: [],
  loading: false,
  error: null,
};

// Subscription Slice
const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Toggle Subscription
      .addCase(toggleSubscribe.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleSubscribe.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleSubscribe.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Get Subscribed Channels
      .addCase(fetchSubscribedChannels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubscribedChannels.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.subscribedChannels = payload;
      })
      .addCase(fetchSubscribedChannels.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Get Channel Subscribers
      .addCase(fetchChannelSubscribers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChannelSubscribers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.channelSubscribers = payload;
      });
  },
});

export default subscriptionSlice.reducer;
