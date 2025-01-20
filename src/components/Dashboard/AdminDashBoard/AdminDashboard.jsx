import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/admin-dashboard/statistics"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-500 px-4 py-2 rounded-md block"
                    : "text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md block"
                }
              >
                Statistics
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-dashboard/manage-users"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-500 px-4 py-2 rounded-md block"
                    : "text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md block"
                }
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-dashboard/manage-coupons"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-500 px-4 py-2 rounded-md block"
                    : "text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md block"
                }
              >
                Manage Coupons
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
