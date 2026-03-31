import { createAsyncThunk } from "@reduxjs/toolkit";
import { couponApi } from "@/services/api/couponApi.js";
import { productApi } from "@/services/api/productApi.js";

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

export const fetchHomeCatalog = createAsyncThunk(
  "products/fetchHomeCatalog",
  async (_, { rejectWithValue }) => {
    try {
      const [featuredProducts, trendingProducts, coupons] = await Promise.all([
        productApi.getFeaturedProducts(),
        productApi.getTrendingProducts(),
        couponApi.getCoupons(),
      ]);

      const validCoupons = coupons.filter(
        (coupon) => new Date(coupon.expiryDate) > new Date()
      );

      return {
        featuredProducts,
        trendingProducts,
        coupons: validCoupons,
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to load home data."));
    }
  }
);

export const fetchAcceptedProducts = createAsyncThunk(
  "products/fetchAcceptedProducts",
  async ({ page = 1, search = "" }, { rejectWithValue }) => {
    try {
      const data = await productApi.getAcceptedProducts({ page, search });
      return {
        products: data.products || [],
        totalPages: data.totalPages || 1,
        currentPage: page,
        search,
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to load products."));
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      return await productApi.getProductById(productId);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to load product details."));
    }
  }
);

export const fetchProductReviews = createAsyncThunk(
  "products/fetchProductReviews",
  async (productId, { rejectWithValue }) => {
    try {
      return await productApi.getProductReviews(productId);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to load reviews."));
    }
  }
);

export const upvoteProduct = createAsyncThunk(
  "products/upvoteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await productApi.upvoteProduct(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to upvote product."));
    }
  }
);

export const reportProduct = createAsyncThunk(
  "products/reportProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await productApi.reportProduct(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to report product."));
    }
  }
);

export const submitProductReview = createAsyncThunk(
  "products/submitProductReview",
  async (payload, { rejectWithValue }) => {
    try {
      return await productApi.createReview(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to submit review."));
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (payload, { rejectWithValue }) => {
    try {
      await productApi.createProduct(payload);
      return payload;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to create product."));
    }
  }
);

export const fetchMyProducts = createAsyncThunk(
  "products/fetchMyProducts",
  async (ownerEmail, { rejectWithValue }) => {
    try {
      return await productApi.getMyProducts(ownerEmail);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to load your products."));
    }
  }
);

export const updateExistingProduct = createAsyncThunk(
  "products/updateExistingProduct",
  async ({ productId, payload }, { rejectWithValue }) => {
    try {
      await productApi.updateProduct(productId, payload);
      return { productId, payload };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to update product."));
    }
  }
);

export const deleteExistingProduct = createAsyncThunk(
  "products/deleteExistingProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await productApi.deleteProduct(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to delete product."));
    }
  }
);

export const fetchModerationQueue = createAsyncThunk(
  "products/fetchModerationQueue",
  async (_, { rejectWithValue }) => {
    try {
      const products = await productApi.getAllProducts();
      return products.sort((a, b) =>
        a.status === "Pending" && b.status !== "Pending" ? -1 : 1
      );
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to load review queue."));
    }
  }
);

export const moderateProduct = createAsyncThunk(
  "products/moderateProduct",
  async ({ productId, action }, { rejectWithValue }) => {
    try {
      await productApi.updateProductReviewStatus(productId, { action });
      return { productId, action };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to update product status."));
    }
  }
);

export const markProductAsFeatured = createAsyncThunk(
  "products/markProductAsFeatured",
  async (productId, { rejectWithValue }) => {
    try {
      await productApi.updateProductReviewStatus(productId, { isFeatured: true });
      return productId;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to feature product."));
    }
  }
);

export const fetchReportedProducts = createAsyncThunk(
  "products/fetchReportedProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await productApi.getReportedProducts();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to load reported products."));
    }
  }
);

export const removeReportedProduct = createAsyncThunk(
  "products/removeReportedProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await productApi.deleteReportedProduct(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to delete reported product."));
    }
  }
);
