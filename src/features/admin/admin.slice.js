import { createSlice } from "@reduxjs/toolkit";
import {
  changeUserRole,
  createNewCoupon,
  deleteExistingCoupon,
  fetchCoupons,
  fetchStatistics,
  fetchUsers,
  updateExistingCoupon,
} from "./admin.thunks.js";

const initialState = {
  users: [],
  coupons: [],
  statistics: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(changeUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user._id === action.payload.userId
            ? { ...user, role: action.payload.role }
            : user
        );
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(createNewCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = [...state.coupons, action.payload];
      })
      .addCase(updateExistingCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = state.coupons.map((coupon) =>
          coupon._id === action.payload.couponId
            ? { ...coupon, ...action.payload.payload }
            : coupon
        );
      })
      .addCase(deleteExistingCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = state.coupons.filter((coupon) => coupon._id !== action.payload);
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addMatcher(
        (action) => action.type.startsWith("admin/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("admin/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
