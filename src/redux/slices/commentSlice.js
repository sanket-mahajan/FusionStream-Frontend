import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCommentsByEntityId,
  addComment,
  deleteComment,
  updateComment,
} from "../../api/comment";

// Thunks

// Fetch comments for an entity (video or tweet)
export const fetchComments = createAsyncThunk(
  "comments/fetchAll",
  async ({ entityId, page, limit }, thunkAPI) => {
    try {
      return await getCommentsByEntityId(entityId, page, limit);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add a comment or reply
export const addNewComment = createAsyncThunk(
  "comments/add",
  async ({ entityId, content, parentId = null }, thunkAPI) => {
    try {
      return await addComment({ entityId, content, parentId });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update a comment
export const updateExistingComment = createAsyncThunk(
  "comments/update",
  async ({ commentId, content }, thunkAPI) => {
    try {
      return await updateComment({ commentId, content });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a comment
export const deleteExistingComment = createAsyncThunk(
  "comments/delete",
  async (commentId, thunkAPI) => {
    try {
      return await deleteComment(commentId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [], // To store the list of comments
    pagination: {}, // To store pagination info
    status: "idle",
    error: null,
  },
  reducers: {
    clearComments: (state) => {
      state.comments = [];
      state.pagination = {};
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Comments
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload.comments; // Extract only the comments array
        state.pagination = action.payload.pagination || {}; // Store pagination if available
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add Comment
      .addCase(addNewComment.fulfilled, (state, action) => {
        if (action.payload.parentId) {
          const parentComment = state.comments.find(
            (comment) => comment._id === action.payload.parentId
          );
          if (parentComment) {
            parentComment.replies = parentComment.replies || [];
            parentComment.replies.push(action.payload); // Append to replies for a parent comment
          }
        } else {
          state.comments.push(action.payload); // Append the new comment
        }
      })
      // Update Comment
      .addCase(updateExistingComment.fulfilled, (state, action) => {
        const { _id, content } = action.payload;
        const existingComment = state.comments.find(
          (comment) => comment._id === _id
        );
        if (existingComment) {
          existingComment.content = content;
        }
      })
      // Delete Comment
      .addCase(deleteExistingComment.fulfilled, (state, action) => {
        const { _id, parentId } = action.payload;
        if (parentId) {
          const parentComment = state.comments.find(
            (comment) => comment._id === parentId
          );
          if (parentComment) {
            parentComment.replies = parentComment.replies.filter(
              (reply) => reply._id !== _id
            );
          }
        } else {
          state.comments = state.comments.filter(
            (comment) => comment._id !== _id
          );
        }
      });
  },
});

// Export the reducer
export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;
