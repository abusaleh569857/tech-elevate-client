import { NavLink, Outlet } from "react-router-dom";

const linkClassName = ({ isActive }) =>
  `block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
    isActive
      ? "bg-white text-slate-900 shadow-lg"
      : "text-white/80 hover:bg-white/10 hover:text-white"
  }`;

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#cffafe_0%,#f8fafc_45%,#e2e8f0_100%)] lg:flex">
      <aside className="border-b border-white/20 bg-[linear-gradient(180deg,#0f172a_0%,#155e75_100%)] p-5 text-white lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
        <h2 className="text-2xl font-black tracking-[0.12em]">User Panel</h2>
        <p className="mt-2 text-sm text-white/70">Manage profile, products and subscriptions from one place.</p>
        <nav className="mt-8 space-y-3">
          <NavLink to="/user-dashboard/my-profile" className={linkClassName}>
            My Profile
          </NavLink>
          <NavLink to="/user-dashboard/add-product" className={linkClassName}>
            Add Product
          </NavLink>
          <NavLink to="/user-dashboard/my-products" className={linkClassName}>
            My Products
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;

