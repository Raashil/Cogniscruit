"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../context/ThemeContext";
//import { useEffect, useState } from "react";
import { useAuth } from '../../lib/auth';


export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, logout } = useAuth();

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   console.log("sujithhhhh");
  //   setIsLoggedIn(!!token);
  // }, []);

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    // localStorage.removeItem("authToken");
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 dark:text-blue-400"
            >
              Cogniscruit
            </Link>
          </div>
          <div className="hidden sm:flex sm:space-x-8">
            <Link
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive("/about")
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              About
            </Link>
            <Link
              href="/features"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive("/features")
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Features
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive("/dashboard")
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                Dashboard
              </Link>
            )}
            <Link
              href="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive("/contact")
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {theme === "light" ? (
                <svg
                  className="w-5 h-5 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-yellow-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors duration-200"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive("/login")
                    ? "bg-blue-700 dark:bg-blue-600 text-white font-semibold"
                    : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                }`}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
