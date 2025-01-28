import axiosInstance from "../utils/axiosInstance";

// Get All tweets
export const getTweets = async (data) => {
  const response = await axiosInstance.get("/tweets", data);
  return response.data.data;
};

// Get tweet by Id
export const getTweetById = async ({ tweetId }) => {
  console.log(tweetId);
  const response = await axiosInstance.get(`/tweets/tweet/${tweetId}`);
  console.log(response);
  return response.data.data;
};

// Create a new tweet
export const createTweet = async (data) => {
  const response = await axiosInstance.post("/tweets", data);
  return response.data.data;
};

// Get tweets for a user
export const getUserTweets = async ({ userId }) => {
  const response = await axiosInstance.get(`/tweets/user/${userId}`);
  return response.data.data;
};

// Update a tweet
export const updateTweet = async (tweetId, data) => {
  const response = await axiosInstance.patch(`/tweets/${tweetId}`, data);
  return response.data.data;
};

// Delete a tweet
export const deleteTweet = async (tweetId) => {
  const response = await axiosInstance.delete(`/tweets/${tweetId}`);
  return response.data.data;
};
