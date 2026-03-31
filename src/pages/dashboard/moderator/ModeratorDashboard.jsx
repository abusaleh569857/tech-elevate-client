import { NavLink, Outlet } from "react-router-dom";

const linkClassName = ({ isActive }) =>
  `block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
    isActive
      ? "bg-amber-300 text-slate-900 shadow-lg"
      : "text-white/80 hover:bg-white/10 hover:text-white"
  }`;

const ModeratorDashboard = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)] lg:flex">
      <aside className="bg-[linear-gradient(180deg,#1e293b_0%,#7c2d12_100%)] p-5 text-white lg:min-h-screen lg:w-72">
        <h2 className="text-2xl font-black tracking-[0.12em]">Moderator</h2>
        <p className="mt-2 text-sm text-white/70">Review submissions, resolve reports, and keep quality high.</p>
        <nav className="mt-8 space-y-3">
          <NavLink to="/moderator-dashboard/review-queue" className={linkClassName}>
            Review Queue
          </NavLink>
          <NavLink to="/moderator-dashboard/reported-contents" className={linkClassName}>
            Reported Content
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default ModeratorDashboard;

