import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link className="text-white font-bold text-lg" href="/">
            Herogram App
          </Link>
        </div>
        <div className="flex items-center">
          <Link
            className="text-white px-4 text-sm font-semibold hover:text-blue-200"
            href="/"
          >
            Home
          </Link>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="bg-white text-blue-500 hover:bg-blue-100 text-sm font-semibold py-2 px-4 rounded-full mr-4"
            >
              Logout
            </button>
          ) : (
            <Link
              className="bg-white text-blue-500 hover:bg-blue-100 text-sm font-semibold py-2 px-4 rounded-full mr-4"
              href="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
