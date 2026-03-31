import PropTypes from "prop-types";

const SectionHeader = ({ eyebrow, title, description }) => {
  return (
    <div>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-black text-slate-900">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
          {description}
        </p>
      ) : null}
    </div>
  );
};

SectionHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default SectionHeader;

