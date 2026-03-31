import { NavLink, Outlet } from "react-router-dom";

const linkClassName = ({ isActive }) =>
  `block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
    isActive
      ? "bg-cyan-400 text-slate-950 shadow-lg"
      : "text-white/80 hover:bg-white/10 hover:text-white"
  }`;

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#dbeafe_100%)] lg:flex">
      <aside className="bg-[linear-gradient(180deg,#020617_0%,#0f766e_100%)] p-5 text-white lg:min-h-screen lg:w-72">
        <h2 className="text-2xl font-black tracking-[0.12em]">Admin Panel</h2>
        <p className="mt-2 text-sm text-white/70">Control users, coupons, and business metrics from one dashboard.</p>
        <nav className="mt-8 space-y-3">
          <NavLink to="/admin-dashboard/statistics" className={linkClassName}>
            Statistics
          </NavLink>
          <NavLink to="/admin-dashboard/manage-users" className={linkClassName}>
            Manage Users
          </NavLink>
          <NavLink to="/admin-dashboard/manage-coupons" className={linkClassName}>
            Manage Coupons
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;

