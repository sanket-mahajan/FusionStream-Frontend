import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateAccountDetails,
  changeCurrentPassword,
  refreshAccessToken,
} from "../../api/auth"; // Path to your axiosInstance file

// **Async Thunks**: Handle API calls with loading states

// Register
export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await registerUser(data);
      return response; // This will be the payload for `fulfilled`
    } catch (error) {
      return rejectWithValue(error.response.data); // Send error payload for `rejected`
    }
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await loginUser(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutUser();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Current User
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentUser();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Current User
export const updateAccDetails = createAsyncThunk(
  "auth/updateAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await updateAccountDetails();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Change Current User Password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (_, { rejectWithValue }) => {
    try {
      const response = await changeCurrentPassword();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Refresh Token
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await refreshAccessToken();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// **Auth Slice**
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // User object
    accessToken: Cookies.get("accessToken") || null, // Retrieve token from cookies
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.isError = false;
      state.errorMessage = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // Handle each API call state (pending, fulfilled, rejected)
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Registration failed!";
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.isError = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Login failed!";
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
      })
      // Fetch Current User
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isError = true;
        state.errorMessage = action.payload || "Failed to fetch user!";
      })
      // Update Current User
      .addCase(updateAccDetails.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateAccDetails.rejected, (state, action) => {
        state.isError = true;
        state.errorMessage = action.payload || "Failed to update user!";
      })
      // Change Current User Password
      .addCase(changePassword.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isError = true;
        state.errorMessage = action.payload || "Failed to update user!";
      })
      // Refresh Token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      });
  },
});

// Export Reducers & Actions
export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
