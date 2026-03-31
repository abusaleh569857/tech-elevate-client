import PropTypes from "prop-types";

const DonutChart = ({
  data,
  size = 320,
  strokeWidth = 36,
  centerLabel,
  centerValue,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((sum, item) => sum + Number(item.value || 0), 0);

  let offset = 0;

  return (
    <div className="relative mx-auto flex w-full max-w-[320px] items-center justify-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90 drop-shadow-[0_20px_35px_rgba(15,23,42,0.12)]"
        role="img"
        aria-label="Statistics distribution chart"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
        />
        {data.map((item) => {
          const value = Number(item.value || 0);
          const segmentLength = total ? (value / total) * circumference : 0;
          const dashArray = `${segmentLength} ${circumference - segmentLength}`;
          const dashOffset = -offset;

          offset += segmentLength;

          return (
            <circle
              key={item.name}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          {centerLabel}
        </p>
        <p className="mt-2 text-4xl font-black text-slate-950">{centerValue}</p>
      </div>
    </div>
  );
};

DonutChart.propTypes = {
  centerLabel: PropTypes.string.isRequired,
  centerValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
};

export default DonutChart;
