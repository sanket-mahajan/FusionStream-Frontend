import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import likeReducer from "./slices/likeSlice";
import playlistReducer from "./slices/playlistSlice";
import subscriptionReducer from "./slices/subscriptionSlice";
import tweetReducer from "./slices/tweetSlice";
import userReducer from "./slices/userSlice";
import videoReducer from "./slices/videoSlice";
import commentReducer from "./slices/commentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    like: likeReducer,
    playlist: playlistReducer,
    subscription: subscriptionReducer,
    tweets: tweetReducer,
    comments: commentReducer,
    user: userReducer,
    video: videoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable this if you're storing non-serializable data like Dates
    }),
});

export default store;
