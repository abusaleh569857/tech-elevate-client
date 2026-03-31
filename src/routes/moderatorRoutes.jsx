import { lazy } from "react";
import { Navigate } from "react-router-dom";
import RoleRoute from "@/routes/guards/RoleRoute.jsx";
import LazyRoute from "@/shared/ui/LazyRoute.jsx";

const ModeratorDashboard = lazy(() =>
  import("@/pages/dashboard/moderator/ModeratorDashboard.jsx")
);
const ProductDetails = lazy(() =>
  import("@/pages/dashboard/moderator/ProductDetails.jsx")
);
const ProductReviewQueue = lazy(() =>
  import("@/pages/dashboard/moderator/ProductReviewQueue.jsx")
);
const ReportedContents = lazy(() =>
  import("@/pages/dashboard/moderator/ReportedContents.jsx")
);

const withLazy = (Component) => (
  <LazyRoute>
    <Component />
  </LazyRoute>
);

export const moderatorRoutes = [
  {
    path: "moderator-dashboard",
    element: (
      <RoleRoute allowedRoles={["moderator", "admin"]}>
        {withLazy(ModeratorDashboard)}
      </RoleRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="review-queue" replace />,
      },
      {
        path: "review-queue",
        element: withLazy(ProductReviewQueue),
      },
      {
        path: "reported-contents",
        element: withLazy(ReportedContents),
      },
      {
        path: "product/:id",
        element: withLazy(ProductDetails),
      },
    ],
  },
];

