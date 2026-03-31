import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks.js";
import { fetchStatistics } from "@/features/admin";
import DonutChart from "@/shared/ui/charts/DonutChart.jsx";
import MetricBarChart from "@/shared/ui/charts/MetricBarChart.jsx";
import Panel from "@/shared/ui/Panel.jsx";
import SectionHeader from "@/shared/ui/SectionHeader.jsx";

const COLORS = ["#0f172a", "#0f766e", "#0891b2", "#f59e0b", "#ef4444", "#7c3aed"];

const Statistics = () => {
  const dispatch = useAppDispatch();
  const { statistics } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  const total = statistics.reduce((sum, item) => sum + Number(item.value || 0), 0);

  const topMetric = statistics.reduce(
    (currentTop, item) =>
      Number(item.value || 0) > Number(currentTop.value || 0) ? item : currentTop,
    statistics[0] || { name: "-", value: 0 }
  );

  const normalizedStatistics = statistics.map((item, index) => ({
    ...item,
    value: Number(item.value || 0),
    color: COLORS[index % COLORS.length],
  }));

  return (
    <Panel>
      <SectionHeader
        eyebrow="Business Health"
        title="Site Statistics"
        description="Track the platform mix across core business metrics from a cleaner executive-style analytics view."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.75rem] bg-[radial-gradient(circle_at_top,#155e75_0%,#082f49_52%,#020617_100%)] p-6 text-white shadow-[0_22px_55px_rgba(8,47,73,0.2)]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-100">
            Total Volume
          </p>
          <p className="mt-3 text-4xl font-black">{total}</p>
        </div>
        <div className="rounded-[1.75rem] bg-[linear-gradient(135deg,#115e59_0%,#14b8a6_100%)] p-6 text-white shadow-[0_22px_55px_rgba(20,184,166,0.2)]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-100">
            Top Metric
          </p>
          <p className="mt-3 text-2xl font-black">{topMetric.name}</p>
          <p className="mt-2 text-sm text-emerald-50/80">{topMetric.value} highest recorded units</p>
        </div>
        <div className="rounded-[1.75rem] bg-[linear-gradient(135deg,#78350f_0%,#f59e0b_100%)] p-6 text-white shadow-[0_22px_55px_rgba(245,158,11,0.22)]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-100">
            Categories
          </p>
          <p className="mt-3 text-4xl font-black">{statistics.length}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {statistics.length ? (
          <>
            <div className="overflow-hidden rounded-[1.9rem] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
                <DonutChart
                  data={normalizedStatistics}
                  centerLabel="Platform Total"
                  centerValue={total}
                />

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                      Distribution Snapshot
                    </p>
                    <h3 className="mt-3 text-2xl font-black text-slate-950">
                      Metric composition across the platform
                    </h3>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {normalizedStatistics.map((item) => {
                      const percentage = total ? Math.round((item.value / total) * 100) : 0;

                      return (
                        <div
                          key={item.name}
                          className="rounded-[1.35rem] border border-white/80 bg-white/80 p-4 backdrop-blur"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="h-3.5 w-3.5 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <p className="text-sm font-black text-slate-900">{item.name}</p>
                          </div>
                          <p className="mt-3 text-3xl font-black text-slate-950">
                            {item.value}
                          </p>
                          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            {percentage}% share
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <MetricBarChart data={normalizedStatistics} total={total} />
          </>
        ) : (
          <p className="text-sm text-slate-500">Loading statistics...</p>
        )}
      </div>
    </Panel>
  );
};

export default Statistics;


