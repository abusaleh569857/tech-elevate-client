import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const ModeratorDashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="bg-blue-700 text-white w-64 p-4">
        <h2 className="text-2xl font-bold mb-6">Moderator Dashboard</h2>
        <nav>
          <NavLink
            to="/moderator-dashboard/review-queue"
            className="block py-2 hover:bg-blue-800 px-4 rounded"
          >
            Product Review Queue
          </NavLink>
          <NavLink
            to="/moderator-dashboard/reported-contents"
            className="block py-2 hover:bg-blue-800 px-4 rounded"
          >
            Reported Contents
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ModeratorDashboard;
