// lib/auth.js
import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for token in localStorage on initial load
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

      // Fetch user data with the token
      axios
        .get("http://127.0.0.1:5050/api/user/profile")
        .then((response) => {
          setUser(response.data.user);
        })
        .catch(() => {
          // If token is invalid, clear everything
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Update axios headers and localStorage when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("authToken");
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = async (googleToken) => {
    try {
      setLoading(true);

      // Send the Google token to your backend
      const response = await axios.post(
        "http://127.0.0.1:5050/api/auth/google",
        {
          token: googleToken,
        }
      );

      // Set user and token from backend response
      setUser(response.data.user);
      setToken(response.data.token);

      // Redirect to dashboard after login
      router.push("/");

      return response.data;
    } catch (error) {
      console.error("Authentication failed:", error);
      console.error(
        "Error details:",
        error.response?.data || "No response data"
      );
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

export const useAuth = () => useContext(AuthContext);

// Higher-order function to protect routes
export function withAuth(Component) {
  return function ProtectedRoute(props) {
    const { loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.replace("/login");
      }
    }, [loading, isAuthenticated, router]);

    // Show loading or null while checking authentication
    if (loading || !isAuthenticated) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      );
    }

    // If authenticated, render the component
    return <Component {...props} />;
  };
}
