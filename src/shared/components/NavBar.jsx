import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks.js";
import { logoutCurrentUser } from "@/features/auth";

const UserAvatarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-11 w-11 text-white"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
  >
    <circle cx="12" cy="8" r="4.2" />
    <path d="M4.5 19.2a8.5 8.5 0 0 1 15 0" strokeLinecap="round" />
  </svg>
);

const navLinkClassName = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-white/15 text-white"
      : "text-white/80 hover:bg-white/10 hover:text-white"
  }`;

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { user, role } = useAppSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const dashboardRoute =
    role === "admin"
      ? "/admin-dashboard"
      : role === "moderator"
      ? "/moderator-dashboard"
      : "/user-dashboard";

  const handleLogout = async () => {
    await dispatch(logoutCurrentUser());
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200/70 bg-[linear-gradient(135deg,#06203f_0%,#0b4f6c_45%,#16a34a_100%)] text-white shadow-lg backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
            </div>
          </button>
          <Link to="/" className="text-2xl font-black tracking-[0.18em] text-white">
            TECHELEVATE
          </Link>
        </div>

        <div
          className={`absolute left-0 top-full w-full border-b border-white/10 bg-slate-950/95 px-4 py-4 lg:static lg:w-auto lg:border-none lg:bg-transparent lg:p-0 ${
            menuOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <NavLink to="/" className={navLinkClassName} onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={navLinkClassName}
              onClick={() => setMenuOpen(false)}
            >
              Products
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-900"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-100 md:inline-flex"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="group relative">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="h-11 w-11 rounded-full border-2 border-white/60 object-cover"
                />
              ) : (
                <UserAvatarIcon />
              )}
              <div className="invisible absolute right-0 top-14 w-52 rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100">
                <p className="text-sm font-bold">{user.displayName || "User"}</p>
                <p className="mt-1 text-xs text-slate-500">{user.email}</p>
                <Link
                  to={dashboardRoute}
                  className="mt-4 block rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold hover:bg-slate-200"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 w-full rounded-xl bg-rose-50 px-4 py-2 text-left text-sm font-semibold text-rose-600 hover:bg-rose-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
