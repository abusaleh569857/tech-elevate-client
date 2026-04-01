import { lazy } from "react";
import LazyRoute from "@/shared/ui/LazyRoute.jsx";

const Home = lazy(() => import("@/pages/home/Home.jsx"));
const Login = lazy(() => import("@/pages/auth/Login.jsx"));
const Register = lazy(() => import("@/pages/auth/Register.jsx"));

const withLazy = (Component) => (
  <LazyRoute>
    <Component />
  </LazyRoute>
);

export const publicRoutes = [
  {
    index: true,
    element: withLazy(Home),
  },
  {
    path: "register",
    element: withLazy(Register),
  },
  {
    path: "login",
    element: withLazy(Login),
  },
];
