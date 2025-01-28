import axiosInstance from "../utils/axiosInstance";

// Toggle like on a video
export const toggleVideoLike = async (videoId) => {
  const response = await axiosInstance.post(`/likes/toggle/v/${videoId}`);
  console.log(response.data.data);
  return response.data.data;
};

// Toggle like on a comment
export const toggleCommentLike = async (commentId) => {
  const response = await axiosInstance.post(`/likes/toggle/c/${commentId}`);
  return response.data.data;
};

// Toggle like on tweet
export const toggleTweetLike = async (tweetId) => {
  const response = await axiosInstance.post(`/likes/toggle/t/${tweetId}`);
  console.log(response.data);
  return response.data.data;
};

// Get liked videos
export const getLikedVideos = async () => {
  const response = await axiosInstance.get("/likes/videos");
  return response.data.data;
};
// Get liked Tweets
export const getLikedTweets = async () => {
  const response = await axiosInstance.get("/likes/tweets");
  console.log(response.data);
  return response.data.data;
};
// Get liked videos
export const getLikedComments = async () => {
  const response = await axiosInstance.get("/likes/comments");
  return response.data.data;
};
