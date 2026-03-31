import { Navigate } from "react-router-dom";
import Root from "@/layouts/RootLayout.jsx";
import ErrorPage from "@/pages/system/ErrorPage.jsx";
import { adminRoutes } from "./adminRoutes.jsx";
import { moderatorRoutes } from "./moderatorRoutes.jsx";
import { publicRoutes } from "./publicRoutes.jsx";
import { userRoutes } from "./userRoutes.jsx";

export const appRoutes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      ...publicRoutes,
      ...userRoutes,
      ...moderatorRoutes,
      ...adminRoutes,
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
];

