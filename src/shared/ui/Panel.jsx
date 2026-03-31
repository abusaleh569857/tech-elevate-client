import PropTypes from "prop-types";

const Panel = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] ${className}`.trim()}
    >
      {children}
    </div>
  );
};

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Panel;

