import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const UseTitle = () => {
  const location = useLocation(); // Get the current route

  useEffect(() => {
    // Set title based on route path
    const path = location.pathname;

    if (path === "/") {
      document.title = "Home - TechElevate";
    } else if (path === "/user-dashboard") {
      document.title = "DashBoard - TechElevate";
    } else if (path === "/products") {
      document.title = "Products - TechElevate";
    } else if (path === "/register") {
      document.title = "Register - TechElevate";
    } else if (path === "/login") {
      document.title = "Login - TechElevate";
    } else {
      document.title = "TechElevate";
    }
  }, [location]);
};

export default UseTitle;
