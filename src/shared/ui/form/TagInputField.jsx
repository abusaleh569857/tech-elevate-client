import PropTypes from "prop-types";
import { useState } from "react";

const TagInputField = ({ label, value, onChange, error, placeholder = "Add a tag" }) => {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const nextTag = draft.trim();

    if (!nextTag || value.includes(nextTag)) {
      return;
    }

    onChange([...value, nextTag]);
    setDraft("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    }

    if (event.key === "Backspace" && !draft && value.length) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      <div className="mt-2 rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {value.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => removeTag(tag)}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-700 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-cyan-800"
            >
              <span>{tag}</span>
              <span aria-hidden="true">x</span>
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-cyan-500"
          />
          <button
            type="button"
            onClick={addTag}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-slate-800"
          >
            Add Tag
          </button>
        </div>
      </div>

      {error ? <p className="mt-2 text-sm font-medium text-rose-600">{error}</p> : null}
    </div>
  );
};

TagInputField.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TagInputField;
