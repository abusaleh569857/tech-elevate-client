import { lazy } from "react";
import { Navigate } from "react-router-dom";
import RoleRoute from "@/routes/guards/RoleRoute.jsx";
import LazyRoute from "@/shared/ui/LazyRoute.jsx";

const AdminDashboard = lazy(() =>
  import("@/pages/dashboard/admin/AdminDashboard.jsx")
);
const ManageCoupons = lazy(() =>
  import("@/pages/dashboard/admin/ManageCoupons.jsx")
);
const ManageUsers = lazy(() =>
  import("@/pages/dashboard/admin/ManageUsers.jsx")
);
const Statistics = lazy(() =>
  import("@/pages/dashboard/admin/Statistics.jsx")
);

const withLazy = (Component) => (
  <LazyRoute>
    <Component />
  </LazyRoute>
);

export const adminRoutes = [
  {
    path: "admin-dashboard",
    element: (
      <RoleRoute allowedRoles={["admin"]}>
        {withLazy(AdminDashboard)}
      </RoleRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="statistics" replace />,
      },
      {
        path: "statistics",
        element: withLazy(Statistics),
      },
      {
        path: "manage-users",
        element: withLazy(ManageUsers),
      },
      {
        path: "manage-coupons",
        element: withLazy(ManageCoupons),
      },
    ],
  },
];

