import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Layout/Root.jsx";

import ErrorPage from "./components/pages/ErrorPage.jsx";
import Home from "./components/pages/Home.jsx";
import Register from "./components/pages/Register.jsx";
import Login from "./components/pages/Login.jsx";
import AuthProvider from "./components/Provider/AuthProvider.jsx";
import UserDashboard from "./components/Dashboard/UserDashBoard/UserDashboard.jsx";
import PrivateRoute from "./components/Route/PrivateRoute.jsx";
import MyProfile from "./components/Dashboard/UserDashBoard/MyProfile.jsx";
import AddProduct from "./components/Dashboard/UserDashBoard/AddProduct.jsx";
import MyProduct from "./components/Dashboard/UserDashBoard/MyProduct.jsx";
import ModeratorDashboard from "./components/Dashboard/ModeratorDashBoard/ModeratorDashboard.jsx";
import ProductReviewQueue from "./components/Dashboard/ModeratorDashBoard/ProductReviewQueue.jsx";
import ReportedContents from "./components/Dashboard/ModeratorDashBoard/ReportedContents.jsx";
import ProductDetails from "./components/Dashboard/ModeratorDashBoard/ProductDetails.jsx";
import ProductsPage from "./components/pages/ProductsPage.jsx";
import AcceptedProductDetails from "./components/pages/AcceptedProductDetails.jsx";
import AdminDashboard from "./components/Dashboard/AdminDashBoard/AdminDashboard.jsx";
import ManageUsers from "./components/Dashboard/AdminDashBoard/ManageUsers.jsx";
import ManageCoupons from "./components/Dashboard/AdminDashBoard/ManageCoupons.jsx";
import Statistics from "./components/Dashboard/AdminDashBoard/Statistics.jsx";
// import AddBook from "./components/AddBook.jsx";
// import AllBooks from "./components/AllBooks.jsx";
// import UpdateBook from "./components/UpdateBook.jsx";
// import CategoryPage from "./components/CategoryPage.jsx";
// import DetailsPage from "./components/DetailsPage.jsx";
// import BorrowedBooks from "./components/BorrowedBooks.jsx";
// import PrivateRoute from "./components/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/products",
        element: (
          <PrivateRoute>
            <ProductsPage></ProductsPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/products/:id",
        element: (
          <PrivateRoute>
            <AcceptedProductDetails></AcceptedProductDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/user-dashboard",
        element: (
          <PrivateRoute>
            <UserDashboard></UserDashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "/user-dashboard/my-profile",
            element: (
              <PrivateRoute>
                <MyProfile></MyProfile>
              </PrivateRoute>
            ),
          },
          {
            path: "/user-dashboard/add-product",
            element: (
              <PrivateRoute>
                <AddProduct></AddProduct>
              </PrivateRoute>
            ),
          },
          {
            path: "/user-dashboard/my-products",
            element: (
              <PrivateRoute>
                <MyProduct></MyProduct>
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "/moderator-dashboard",
        element: (
          <PrivateRoute>
            {" "}
            <ModeratorDashboard></ModeratorDashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "/moderator-dashboard/review-queue",
            element: (
              <PrivateRoute>
                <ProductReviewQueue></ProductReviewQueue>
              </PrivateRoute>
            ),
          },
          {
            path: "/moderator-dashboard/reported-contents",
            element: (
              <PrivateRoute>
                <ReportedContents></ReportedContents>
              </PrivateRoute>
            ),
          },
          {
            path: "/moderator-dashboard/product/:id",
            element: (
              <PrivateRoute>
                <ProductDetails></ProductDetails>
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "/admin-dashboard",
        element: (
          <PrivateRoute>
            <AdminDashboard></AdminDashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "manage-users",
            element: (
              <PrivateRoute>
                <ManageUsers></ManageUsers>
              </PrivateRoute>
            ),
          },
          {
            path: "manage-coupons",
            element: (
              <PrivateRoute>
                <ManageCoupons></ManageCoupons>
              </PrivateRoute>
            ),
          },
          {
            path: "statistics",
            element: (
              <PrivateRoute>
                <Statistics></Statistics>
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
