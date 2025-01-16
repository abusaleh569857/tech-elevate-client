import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="bg-gradient-to-br from-blue-500 to-blue-700 text-white lg:w-64 p-4 space-y-4">
        <h2 className="text-2xl font-bold text-center">User Dashboard</h2>
        <nav className="space-y-2">
          <NavLink
            to="/user-dashboard/my-profile"
            className="block px-4 py-2 rounded hover:bg-blue-600"
            activeClassName="bg-blue-600"
          >
            My Profile
          </NavLink>
          <NavLink
            to="/user-dashboard/add-product"
            className="block px-4 py-2 rounded hover:bg-blue-600"
            activeClassName="bg-blue-600"
          >
            Add Product
          </NavLink>
          <NavLink
            to="/user-dashboard/my-products"
            className="block px-4 py-2 rounded hover:bg-blue-600"
            activeClassName="bg-blue-600"
          >
            My Products
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
