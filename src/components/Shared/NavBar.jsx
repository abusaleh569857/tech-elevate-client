import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FaUserCircle } from "react-icons/fa"; // Import the user icon

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout().catch((error) => console.error(error.message));
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* Hamburger Menu for Mobile */}
        <div
          className="lg:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-6 h-1 bg-white mb-1 rounded"></div>
          <div className="w-6 h-1 bg-white mb-1 rounded"></div>
          <div className="w-6 h-1 bg-white rounded"></div>
        </div>

        {/* Navbar Brand */}
        <h1 className="text-2xl font-bold tracking-wide hover:text-blue-200 flex-grow text-center lg:text-left lg:flex-grow-0">
          TechElevate
        </h1>

        {/* Navbar Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:flex flex-col lg:flex-row lg:items-center absolute lg:static bg-blue-600 lg:bg-transparent w-full lg:w-auto left-0 top-14 lg:top-0 z-50 shadow-lg lg:shadow-none transition-all duration-300 lg:space-x-6`}
        >
          <NavLink
            to="/"
            className="block py-2 px-4 lg:inline-block hover:text-blue-300"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className="block py-2 px-4 lg:inline-block hover:text-blue-300"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </NavLink>
        </div>

        {/* User Authentication/Profile Section */}
        <div className="absolute right-0 top-4 lg:static flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-white rounded hover:bg-white hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hidden md:block px-4 py-2 border border-white rounded hover:bg-white hover:text-blue-600 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative group">
              {/* Show user photo or fallback to icon */}
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-white cursor-pointer" />
              )}
              <div className="absolute hidden group-hover:block bg-white text-blue-600 rounded shadow-lg right-0 top-8 p-4 w-40">
                <p className="font-semibold text-sm">
                  {user.displayName || "User"}
                </p>
                <NavLink
                  to="/user-dashboard"
                  className="block py-2 hover:text-blue-800 transition"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 hover:text-blue-800 transition"
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
