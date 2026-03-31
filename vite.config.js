import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return undefined;
          }

          if (id.includes("@stripe")) {
            return "stripe-vendor";
          }

          if (id.includes("sweetalert2")) {
            return "alerts-vendor";
          }

          if (id.includes("react-slick") || id.includes("slick-carousel")) {
            return "slider-vendor";
          }

          if (id.includes("firebase")) {
            return "firebase-vendor";
          }

          if (id.includes("@reduxjs/toolkit") || id.includes("react-redux")) {
            return "state-vendor";
          }

          if (id.includes("react-router")) {
            return "router-vendor";
          }

          if (id.includes("react-icons") || id.includes("prop-types")) {
            return "ui-vendor";
          }

          if (id.includes("react") || id.includes("scheduler")) {
            return "react-vendor";
          }

          return "vendor";
        },
      },
    },
  },
});
