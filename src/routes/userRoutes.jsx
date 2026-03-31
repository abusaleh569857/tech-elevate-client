import { lazy } from "react";
import { Navigate } from "react-router-dom";
import PrivateRoute from "@/routes/guards/PrivateRoute.jsx";
import LazyRoute from "@/shared/ui/LazyRoute.jsx";

const AddProduct = lazy(() =>
  import("@/pages/dashboard/user/AddProduct.jsx")
);
const MyProduct = lazy(() =>
  import("@/pages/dashboard/user/MyProduct.jsx")
);
const MyProfile = lazy(() =>
  import("@/pages/dashboard/user/MyProfile.jsx")
);
const UserDashboard = lazy(() =>
  import("@/pages/dashboard/user/UserDashboard.jsx")
);
const AcceptedProductDetails = lazy(() =>
  import("@/pages/product/AcceptedProductDetails.jsx")
);
const ProductsPage = lazy(() => import("@/pages/product/ProductsPage.jsx"));

const withLazy = (Component) => (
  <LazyRoute>
    <Component />
  </LazyRoute>
);

export const userRoutes = [
  {
    path: "products",
    element: <PrivateRoute>{withLazy(ProductsPage)}</PrivateRoute>,
  },
  {
    path: "products/:id",
    element: <PrivateRoute>{withLazy(AcceptedProductDetails)}</PrivateRoute>,
  },
  {
    path: "user-dashboard",
    element: <PrivateRoute>{withLazy(UserDashboard)}</PrivateRoute>,
    children: [
      {
        index: true,
        element: <Navigate to="my-profile" replace />,
      },
      {
        path: "my-profile",
        element: withLazy(MyProfile),
      },
      {
        path: "add-product",
        element: withLazy(AddProduct),
      },
      {
        path: "my-products",
        element: withLazy(MyProduct),
      },
    ],
  },
];

