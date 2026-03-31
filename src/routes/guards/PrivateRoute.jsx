import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/app/hooks.js";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, initialized, sessionLoading } = useAppSelector((state) => state.auth);

  if (!initialized || sessionLoading) {
    return null;
  }

  return user ? children : <Navigate to="/login" replace state={{ from: location }} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;

