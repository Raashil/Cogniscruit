"use client";

import { signIn, signOut } from "next-auth/react";

export default function AuthActions() {
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
    >
      Sign in with Google
    </button>
  );
}
