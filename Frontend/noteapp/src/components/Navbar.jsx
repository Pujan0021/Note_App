import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">Note_Loop</span>
          </div>

          {/* Middle - Search bar */}
          <div className="flex-1 flex items-center justify-center px-2">
            <div className="w-full max-w-lg">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right side - Links */}
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600">
              Signup
            </Link>
            <Link to="/logout" className="text-gray-700 hover:text-blue-600">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
