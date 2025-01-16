import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root.jsx";

import ErrorPage from "./components/ErrorPage.jsx";
import Home from "./components/Home.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import AuthProvider from "./components/Provider/AuthProvider.jsx";
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
      // {
      //   path: "/add-book",
      //   element: (
      //     <PrivateRoute>
      //       <AddBook></AddBook>
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "/all-books",
      //   element: (
      //     <PrivateRoute>
      //       <AllBooks></AllBooks>
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "/update-book/:id",
      //   element: (
      //     <PrivateRoute>
      //       <UpdateBook></UpdateBook>
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "/category/:category",
      //   element: (
      //     <PrivateRoute>
      //       <CategoryPage></CategoryPage>
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "/book-details/:id",
      //   element: (
      //     <PrivateRoute>
      //       <DetailsPage></DetailsPage>
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "/borrowed-books",
      //   element: (
      //     <PrivateRoute>
      //       <BorrowedBooks></BorrowedBooks>
      //     </PrivateRoute>
      //   ),
      // },
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
