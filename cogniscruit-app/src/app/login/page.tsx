"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 relative">
      <Link
        href="/"
        className="absolute top-4 left-4 text-blue-500 hover:underline px-4 py-2 border rounded-md"
      >
        Home
      </Link>

      <h1 className="text-4xl font-bold mb-6">
        {isLogin ? "Login" : "Sign Up"}
      </h1>

      <form className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-black">
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
          <label className="block text-sm font-medium text-black">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-md p-2 mt-1 text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black">
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

        <div className="flex flex-col items-center gap-2 mt-4 w-full">
          <div className="w-full h-6"></div>

          <button
            onClick={() => signIn("google")}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 flex items-center justify-center gap-2"
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            Sign in with Google
          </button>

          <button
            onClick={() => signIn("github")}
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 flex items-center justify-center gap-2"
          >
            <Image src="/github.svg" alt="GitHub" width={20} height={20} />
            Sign in with GitHub
          </button>
        </div>
      </form>

      <p className="mt-4 text-sm">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          className="text-blue-600 underline ml-1"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}
