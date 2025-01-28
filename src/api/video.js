import axiosInstance from "../utils/axiosInstance";

// Fetch all videos
export const getAllVideos = async (q) => {
  if (q == undefined || q == "") {
    const response = await axiosInstance.get("/videos/getAllVideos");
    console.log("wo q", response.data);
    return response.data.data;
  } else if (q != undefined && q != "") {
    const { query } = q;
    console.log("q", query);
    const response = await axiosInstance.get(
      `/videos/getAllVideos?query=${query}`
    );
    console.log("w q", response.data);
    return response.data.data;
  }
};

// Fetch a single video by ID
export const getVideoById = async (videoId) => {
  const response = await axiosInstance.get(`/videos/getVideoById/${videoId}`);
  return response.data.data;
};

// Upload a video
export const uploadVideo = async (data) => {
  const response = await axiosInstance.post("/videos/upload-video", data, {
    headers: {
      "Content-Type": "multipart/form-data", // Let Axios handle this automatically
    },
  });
  return response.data.data;
};

// Update video details
export const updateVideoDetails = async (videoId, data) => {
  const response = await axiosInstance.patch(
    `/videos/updateDetails/${videoId}`,
    data
  );
  return response.data.data;
};

// Delete a video
export const deleteVideo = async (videoId) => {
  const response = await axiosInstance.delete(`/videos/deleteVideo/${videoId}`);
  return response.data;
};

// Get Video By Owner
export const getUploadedVideos = async () => {
  const response = await axiosInstance.get("/videos/getUploadedVideos");
  return response.data.data;
};
