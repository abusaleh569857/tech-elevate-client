import PropTypes from "prop-types";

const variantClasses = {
  primary:
    "bg-slate-950 text-white hover:bg-cyan-700 focus-visible:ring-cyan-200",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:border-cyan-500 hover:text-cyan-700 focus-visible:ring-cyan-100",
  ghost:
    "bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-slate-200",
  danger:
    "bg-rose-500 text-white hover:bg-rose-600 focus-visible:ring-rose-200",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.15em] transition focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "ghost", "danger"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;

