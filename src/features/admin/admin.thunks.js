import { createAsyncThunk } from "@reduxjs/toolkit";
import { couponApi } from "@/services/api/couponApi.js";
import { statisticsApi } from "@/services/api/statisticsApi.js";
import { userApi } from "@/services/api/userApi.js";

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await userApi.getAllUsers();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to load users."));
    }
  }
);

export const changeUserRole = createAsyncThunk(
  "admin/changeUserRole",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const data = await userApi.updateUserRole(userId, role);
      return { userId, role: data.role || role };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to update user role."));
    }
  }
);

export const fetchCoupons = createAsyncThunk(
  "admin/fetchCoupons",
  async (_, { rejectWithValue }) => {
    try {
      return await couponApi.getCoupons();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to load coupons."));
    }
  }
);

export const createNewCoupon = createAsyncThunk(
  "admin/createNewCoupon",
  async (payload, { rejectWithValue }) => {
    try {
      await couponApi.createCoupon(payload);
      return payload;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to create coupon."));
    }
  }
);

export const updateExistingCoupon = createAsyncThunk(
  "admin/updateExistingCoupon",
  async ({ couponId, payload }, { rejectWithValue }) => {
    try {
      await couponApi.updateCoupon(couponId, payload);
      return { couponId, payload };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to update coupon."));
    }
  }
);

export const deleteExistingCoupon = createAsyncThunk(
  "admin/deleteExistingCoupon",
  async (couponId, { rejectWithValue }) => {
    try {
      await couponApi.deleteCoupon(couponId);
      return couponId;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to delete coupon."));
    }
  }
);

export const fetchStatistics = createAsyncThunk(
  "admin/fetchStatistics",
  async (_, { rejectWithValue }) => {
    try {
      return await statisticsApi.getSiteStatistics();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to load statistics."));
    }
  }
);
