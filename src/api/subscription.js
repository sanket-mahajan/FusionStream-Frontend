import axiosInstance from "../utils/axiosInstance";

// Subscribe to a channel
export const toggleSubscription = async (channelId) => {
  const response = await axiosInstance.post(`/subscriptions/c/${channelId}`);
  return response.data;
};

// Get subscribed channels
export const getSubscribedChannels = async (subscriberId) => {
  const response = await axiosInstance.get(`/subscriptions/c/${subscriberId}`);
  console.log(response.data);
  return response.data;
};

// Get channel subscribers
export const getChannelSubscribers = async (channelId) => {
  const response = await axiosInstance.get(`/subscriptions/u/${channelId}`);
  console.log(response.data);
  return response.data;
};
