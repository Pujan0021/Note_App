import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const Navbar = () => {
  const { user, logOut } = useAuth();
  return (
    <nav className="bg-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <span className=" md:text-2xl font-bold text-white">Note_Loop</span>
          </div>

          {/* Middle - Search bar */}
          <div className="flex-1 flex items-center justify-center px-2">
            <div className="w-full max-w-lg">
              <input
                type="text"
                placeholder="Search..."
                className=" w-full md:w-80 px-2 py-2 
                bg-white
                rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right side - Links */}
          <div className="flex md:text-xl items-center space-x-6">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-blue-300 transition-transform hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:text-blue-300 transition-transform hover:scale-105"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <div className="md:text-xl text-white  transition-transform hover:scale-105">
                  {user.name}
                </div>

                <Link
                  to="/"
                  className="text-white hover:text-blue-300 transition-transform hover:scale-105"
                >
                  <button
                    onClick={logOut}
                    className="bg-amber-700 p-1.5 rounded-sm w-25 text-white cursor-pointer "
                  >
                    Logout
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
