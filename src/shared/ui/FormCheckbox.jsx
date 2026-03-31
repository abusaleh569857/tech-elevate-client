import { forwardRef } from "react";
import PropTypes from "prop-types";

const FormCheckbox = forwardRef(
  ({ label, error, containerClassName = "", inputClassName = "", ...props }, ref) => {
    return (
      <div className={containerClassName}>
        <label className="flex items-start gap-3">
          <input
            ref={ref}
            type="checkbox"
            className={`mt-1 h-4 w-4 rounded border-slate-300 ${inputClassName}`.trim()}
            {...props}
          />
          <span className="text-sm text-slate-600">{label}</span>
        </label>
        {error ? (
          <p className="mt-2 text-sm font-medium text-rose-600">{error}</p>
        ) : null}
      </div>
    );
  }
);

FormCheckbox.displayName = "FormCheckbox";

FormCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  containerClassName: PropTypes.string,
  inputClassName: PropTypes.string,
};

export default FormCheckbox;

