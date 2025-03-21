"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { data: session, status } = useSession();

  // Redirect logic (optional, if needed)
  useEffect(() => {
    if (session && status === "authenticated") {
      // Handle post-login logic here if needed
      console.log("Logged in as", session.user?.name);
    }
  }, [session, status]);

  if (session) {
    return (
      <div className="min-h-screen bg-white pt-24 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Hi {session.user?.name}
        </h1>
        <p className="mt-4 text-gray-600">
          You're signed in with {session.user?.email}
        </p>
        <button
          onClick={() => signOut()}
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="text-2xl font-bold text-blue-600">
                  Cogniscruit
                </span>
              </Link>
            </div>
            <div className="hidden sm:flex sm:space-x-8">
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              <Link
                href="/features"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Features
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
            {isLogin ? "Login" : "Sign Up"}
          </h1>

          <form className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border rounded-md p-2 mt-1 text-black"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-md p-2 mt-1 text-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border rounded-md p-2 mt-1 text-black"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>

            <div className="flex flex-col items-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => signIn("google")}
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 flex items-center justify-center gap-2"
              >
                <Image src="/google.svg" alt="Google" width={20} height={20} />
                Sign in with Google
              </button>

              <button
                type="button"
                onClick={() => signIn("github")}
                className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 flex items-center justify-center gap-2"
              >
                <Image src="/github.svg" alt="GitHub" width={20} height={20} />
                Sign in with GitHub
              </button>
            </div>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              className="text-blue-600 underline ml-1"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
