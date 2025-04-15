"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      setIsLoading(false);
      alert("This is a demo. Login is disabled.");
    }, 1000);
  };
  const handleGoogleSignIn = async (credentialResponse: any) => {
    try {
      const googleToken = credentialResponse?.credential;
      if (!googleToken) throw new Error("Google token not found");
      //console.log("Google token:", googleToken);
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: googleToken }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Backend authentication failed");
      }

      const backendData = await response.json();
      localStorage.setItem("authToken", backendData.token);
      localStorage.setItem("userName", backendData.user.name || "User");
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message || "Google sign-in failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {isLoading
                ? "Loading..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>
          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSignIn}
              onError={() => setError("Google Login Failed")}
              useOneTap
              text="signin_with"
            />
          </div>

          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="ml-1 font-medium text-blue-600 dark:text-blue-400"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
