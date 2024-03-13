import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import herogramLogo from "@/public/icons/herogram-logo.png";
import Image from "next/image";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav
      className="bg-blue-500 p-4"
      style={{ position: "sticky", top: 0, zIndex: 1000 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-white font-bold text-lg" href="/">
          <div className="flex items-center gap-2">
            <Image
              className="w-12 h-12 border-3 p-1 border-gray-50 border rounded-xl bg-gray-50"
              src={herogramLogo.src}
              alt="Herogram logo"
              height={200}
              width={200}
            />
            Herogram App
          </div>
        </Link>
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
