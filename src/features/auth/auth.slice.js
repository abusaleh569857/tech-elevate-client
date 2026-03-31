import { createSlice } from "@reduxjs/toolkit";
import {
  loginWithEmail,
  loginWithGoogle,
  logoutCurrentUser,
  refreshCurrentUserProfile,
  registerWithEmail,
  subscribeToMembership,
  syncAuthSession,
} from "./auth.thunks.js";

const initialState = {
  user: null,
  token: localStorage.getItem("userToken"),
  profile: null,
  role: null,
  initialized: false,
  loading: false,
  sessionLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncAuthSession.pending, (state) => {
        state.sessionLoading = true;
        state.error = null;
      })
      .addCase(syncAuthSession.fulfilled, (state, action) => {
        state.sessionLoading = false;
        state.initialized = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.profile = action.payload.profile;
        state.role = action.payload.role;
      })
      .addCase(syncAuthSession.rejected, (state, action) => {
        state.sessionLoading = false;
        state.initialized = true;
        state.error = action.payload;
      })
      .addCase(registerWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerWithEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutCurrentUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.profile = null;
        state.role = null;
      })
      .addCase(logoutCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refreshCurrentUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.role = action.payload?.role || state.role;
      })
      .addCase(subscribeToMembership.pending, (state) => {
        state.loading = true;
      })
      .addCase(subscribeToMembership.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(subscribeToMembership.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
