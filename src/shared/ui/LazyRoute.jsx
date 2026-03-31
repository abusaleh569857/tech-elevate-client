import { Suspense } from "react";
import PropTypes from "prop-types";
import PageLoader from "./PageLoader.jsx";

const LazyRoute = ({ children }) => {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
};

LazyRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LazyRoute;

