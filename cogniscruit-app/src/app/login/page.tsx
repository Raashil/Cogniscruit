"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, loading } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("Auth Status ->", { loading, isAuthenticated });

  useEffect(() => {
    if (!loading && isAuthenticated) {
      console.log("Hello sujith");
      router.push("/dashboard");
    }
  }, [isAuthenticated, loading, router]);

  const handleGoogleSignIn = async (credentialResponse: any) => {
    try {
      setIsLoading(true);
      setError("");

      if (!credentialResponse?.credential) {
        throw new Error("Google token not found");
      }

      await login(credentialResponse.credential); // auth context handles token storage
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Google sign-in failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
            Sign In
          </h1>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="mt-6 flex justify-center">
            {isLoading ? (
              <div className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-full">
                Processing...
              </div>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSignIn}
                onError={() => setError("Google Login Failed")}
                useOneTap
                text="signin_with"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
