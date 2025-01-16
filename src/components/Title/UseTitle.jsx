import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const UseTitle = () => {
  const location = useLocation(); // Get the current route

  useEffect(() => {
    // Set title based on route path
    const path = location.pathname;

    if (path === "/") {
      document.title = "Home - BookHub";
      // } else if (path === "/add-book") {
      //   document.title = "Add Books - BookHub";
      // } else if (path === "/all-books") {
      //   document.title = "All Books - BookHub";
      // } else if (path === "/borrowed-books") {
      //   document.title = "Borrowed Books - BookHub";
    } else if (path === "/register") {
      document.title = "Register - TechElevate";
    } else if (path === "/login") {
      document.title = "Login - TechElevate";
    } else {
      document.title = "TechElevate";
    }
  }, [location]); // Run effect whenever the location changes
};

export default UseTitle;
