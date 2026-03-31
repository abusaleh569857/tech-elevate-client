import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/app/hooks.js";

const RoleRoute = ({ allowedRoles, children }) => {
  const location = useLocation();
  const { user, role, initialized, sessionLoading } = useAppSelector((state) => state.auth);

  if (!initialized || sessionLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/user-dashboard" replace />;
  }

  return children;
};

RoleRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};

export default RoleRoute;

