// lib/auth.tsx
"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { deleteCookie } from 'cookies-next';


// Define the shape of the user object
interface User {
  [key: string]: any; // Allows for dynamic properties
}

// Define the authentication context type
interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (googleToken: string) => Promise<any>;
  logout: () => void;
}

// Create the authentication context with a default value of null
const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Move the logout function before the useEffect where it's used
  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    console.log('delete cookie of logout');
    deleteCookie('authToken');
    setUser(null);
    setToken(null);
    router.push('/login');
  }, [router,deleteCookie]);

  useEffect(() => {
    // Check for token in localStorage on initial load
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

      // Fetch user data with the token
      axios
        .get<any>('http://127.0.0.1:5050/api/user/profile')
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
  }, [logout]);

  // Update axios headers and localStorage when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('authToken');
      delete axios.defaults.headers.common['Authorization'];
      // console.log('delete cookie of if else');
      // deleteCookie('authToken');
    }
  }, [token,deleteCookie]);

  const login = async (googleToken: string): Promise<any> => {
    try {
      setLoading(true);

      // Send the Google token to your backend
      const response = await axios.post<any>(
        'http://127.0.0.1:5050/api/auth/google',
        {
          token: googleToken,
        }
      );

      // Set user and token from backend response
      setUser(response.data.user);
      setToken(response.data.token);

      document.cookie = `authToken=${response.data.token}; path=/; max-age=86400; samesite=strict`;
      console.log('added cookie');


      // Changed this line - redirect to dashboard after login
      router.push('/dashboard');

      return response.data;
    } catch (error: any) {
      console.error('Authentication failed:', error);
      console.error(
        'Error details:',
        error.response?.data || 'No response data'
      );
      throw error;
    } finally {
      setLoading(false);
    }
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

// Custom hook to use the authentication context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher-order function to protect routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function ProtectedRoute(props: P) {
    const { loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.replace('/login');
      }
    }, [loading, isAuthenticated, router]);

    // Show loading or null while checking authentication
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      );
    }

    // If not authenticated and not loading, don't render anything
    if (!isAuthenticated) {
      return null;
    }

    // If authenticated, render the component
    return <Component {...props} />;
  };
}