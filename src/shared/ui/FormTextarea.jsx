import { forwardRef } from "react";
import PropTypes from "prop-types";

const FormTextarea = forwardRef(
  ({ label, error, className = "", containerClassName = "", ...props }, ref) => {
    return (
      <div className={containerClassName}>
        {label ? (
          <label className="block text-sm font-semibold text-slate-700">
            {label}
          </label>
        ) : null}
        <textarea
          ref={ref}
          className={`mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 ${className}`.trim()}
          {...props}
        />
        {error ? (
          <p className="mt-2 text-sm font-medium text-rose-600">{error}</p>
        ) : null}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";

FormTextarea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default FormTextarea;

