import axiosInstance from "../utils/axiosInstance";

// Add a comment or reply to a comment
export const addComment = async ({ entityId, content, parentId = null }) => {
  console.log(content);
  const payload = { content };
  if (parentId) payload.parentId = parentId; // Include parentId for replies

  const response = await axiosInstance.post(`/comments/${entityId}`, payload);
  return response.data.data;
};

// Get comments for a video or tweet
export const getCommentsByEntityId = async (entityId, page = 1, limit = 10) => {
  const response = await axiosInstance.get(
    `/comments/${entityId}?page=${page}&limit=${limit}`
  );
  return response.data.data;
};

// Update a comment
export const updateComment = async ({ commentId, content }) => {
  const response = await axiosInstance.patch(`/comments/c/${commentId}`, {
    content,
  });
  return response.data.data;
};

// Delete a comment
export const deleteComment = async ({ commentId }) => {
  const response = await axiosInstance.delete(`/comments/c/${commentId}`);
  return response.data.data;
};
