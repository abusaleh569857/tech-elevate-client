import PropTypes from "prop-types";

const MetricBarChart = ({ data, total }) => (
  <div className="space-y-4">
    {data.map((item) => {
      const value = Number(item.value || 0);
      const percentage = total ? Math.round((value / total) * 100) : 0;

      return (
        <div
          key={item.name}
          className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span
                  className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <p className="truncate text-sm font-black text-slate-900">{item.name}</p>
              </div>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                {percentage}% contribution
              </p>
            </div>
            <p className="text-2xl font-black text-slate-950">{value}</p>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{
                width: `${Math.max(percentage, value > 0 ? 8 : 0)}%`,
                background: `linear-gradient(90deg, ${item.color}, ${item.color}CC)`,
              }}
            />
          </div>
        </div>
      );
    })}
  </div>
);

MetricBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
};

export default MetricBarChart;
