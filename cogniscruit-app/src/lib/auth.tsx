// lib/auth.tsx
"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation"; // useRouter from app/ directory
import axios from "axios";

// Define the shape of the context
interface User {
  name: string;
  email: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (googleToken: string) => Promise<any>;
  logout: () => void;
}

// Create the context with an explicit type
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /*useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    console.log("AuthProvider: Found token in localStorage?", storedToken);

    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

      axios
        .get("http://localhost:5050/api/user/profile")
        .then((res) => {
          setUser(res.data.user);
          console.log("User profile fetched:", res.data.user);
        })
        .catch((err) => {
          console.error("Token invalid. Logging out...");
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);*/

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("authToken");
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = async (googleToken: string) => {
    try {
      setLoading(true);
      console.log("Login started with token", googleToken);

      const response = await axios.post(
        "http://127.0.0.1:5050/api/auth/google",
        {
          token: googleToken,
        }
      );

      console.log("Backend response received", response.data);

      const { token, user } = response.data;

      localStorage.setItem("authToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setToken(token);
      setUser(user);

      console.log("✅ Token stored. Redirecting to dashboard...");

      // ✅ Step 3: Slight delay (optional but safe for async sync)
      router.push("/dashboard");
      console.log("✅ Token saved. Now redirecting to /dashboard...");
      return response.data;
    } catch (error: any) {
      console.error("❌ Authentication failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
