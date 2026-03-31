import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/features/auth";
import { productsReducer } from "@/features/products";
import { adminReducer } from "@/features/admin";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    admin: adminReducer,
  },
});


