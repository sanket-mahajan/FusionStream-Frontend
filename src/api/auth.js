import axiosInstance from "../utils/axiosInstance";

//Register
export const registerUser = async (data) => {
  const response = await axiosInstance.post("/users/register", data);
  return response.data;
};

//Login
export const loginUser = async (data) => {
  const response = await axiosInstance.post("/users/login", data);
  return response.data.data;
};

// Protected Routes

//Logout
export const logoutUser = async () => {
  const response = await axiosInstance.post("/users/logout");
  return response.data;
};

//current-user
export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/users/current-user");
  return response.data;
};

//Update account
export const updateAccountDetails = async (data) => {
  const response = await axiosInstance.patch("users/update-account", data);
  return response.data.data;
};

//Change Password
export const changeCurrentPassword = async (data) => {
  const response = await axiosInstance.patch("users/change-password", data);
  return response.data;
};

//Update User Avatar
export const updateUserAvatar = async (data) => {
  const response = await axiosInstance.patch("users/avatar", data);
  return response.data;
};

//Update User Cover-Image
export const updateUserCoverImage = async (data) => {
  const response = await axiosInstance.patch("users/cover-image", data);
  return response.data;
};

//Get User Channel Profile
export const getUserChannelProfile = async (userId) => {
  const response = await axiosInstance.get(`users/c/${userId}`);
  return response.data.data;
};

//Get user watch history
export const getUserWatchHistory = async () => {
  const response = await axiosInstance.get("users/history");
  return response.data.data;
};

// Refresh Token
export const refreshAccessToken = async () => {
  const response = await axiosInstance.get("/users/refresh-token");
  return response.data.data;
};

// Update Watch History
export const updateWatchHistory = async (data) => {
  const response = await axiosInstance.patch("users/update-watchhistory", data);
  console.log(response.data);
  return response.data.data;
};
