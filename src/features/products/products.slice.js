import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteExistingProduct,
  fetchAcceptedProducts,
  fetchHomeCatalog,
  fetchModerationQueue,
  fetchMyProducts,
  fetchProductDetails,
  fetchProductReviews,
  fetchReportedProducts,
  markProductAsFeatured,
  moderateProduct,
  removeReportedProduct,
  reportProduct,
  submitProductReview,
  updateExistingProduct,
  upvoteProduct,
} from "./products.thunks.js";

const incrementVotes = (items, productId) =>
  items.map((item) =>
    item._id === productId
      ? { ...item, upvotes: (item.upvotes || 0) + 1 }
      : item
  );

const initialState = {
  featuredProducts: [],
  trendingProducts: [],
  coupons: [],
  acceptedProducts: [],
  acceptedProductsMeta: {
    currentPage: 1,
    totalPages: 1,
    search: "",
  },
  productDetails: null,
  reviews: [],
  myProducts: [],
  moderationQueue: [],
  reportedProducts: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeCatalog.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload.featuredProducts;
        state.trendingProducts = action.payload.trendingProducts;
        state.coupons = action.payload.coupons;
      })
      .addCase(fetchAcceptedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.acceptedProducts = action.payload.products;
        state.acceptedProductsMeta = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          search: action.payload.search,
        };
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(upvoteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = incrementVotes(state.featuredProducts, action.payload);
        state.trendingProducts = incrementVotes(state.trendingProducts, action.payload);
        state.acceptedProducts = incrementVotes(state.acceptedProducts, action.payload);
        state.myProducts = incrementVotes(state.myProducts, action.payload);

        if (state.productDetails?._id === action.payload) {
          state.productDetails.upvotes = (state.productDetails.upvotes || 0) + 1;
        }
      })
      .addCase(reportProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitProductReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = [...state.reviews, action.payload];
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.myProducts = [...state.myProducts, action.payload];
      })
      .addCase(fetchMyProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.myProducts = action.payload;
      })
      .addCase(updateExistingProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.myProducts = state.myProducts.map((product) =>
          product._id === action.payload.productId
            ? { ...product, ...action.payload.payload }
            : product
        );
      })
      .addCase(deleteExistingProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.myProducts = state.myProducts.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(fetchModerationQueue.fulfilled, (state, action) => {
        state.loading = false;
        state.moderationQueue = action.payload;
      })
      .addCase(moderateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.moderationQueue = state.moderationQueue.map((product) =>
          product._id === action.payload.productId
            ? {
                ...product,
                status: action.payload.action === "Accept" ? "Accepted" : "Rejected",
              }
            : product
        );
      })
      .addCase(markProductAsFeatured.fulfilled, (state, action) => {
        state.loading = false;
        state.moderationQueue = state.moderationQueue.map((product) =>
          product._id === action.payload ? { ...product, isFeatured: true } : product
        );
      })
      .addCase(fetchReportedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.reportedProducts = action.payload;
      })
      .addCase(removeReportedProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.reportedProducts = state.reportedProducts.filter(
          (product) => product._id !== action.payload
        );
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("products/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("products/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearProductsError } = productsSlice.actions;
export default productsSlice.reducer;
