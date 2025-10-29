import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { USER_ROLES } from '../utils/constants';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || '/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/auth/me`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (err) {
      // User not authenticated
      setUser(null);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (credential) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${API_URL}/auth/login`,
        { credential },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
        // Store token in localStorage for subsequent requests
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        return { success: true, user: response.data.user };
      }

      return { success: false, error: 'Login failed' };
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Failed to login with Google';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${API_URL}/auth/login-email`,
        { email, password },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
        // Store token in localStorage for subsequent requests
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        return { success: true, user: response.data.user };
      }

      return { success: false, error: 'Login failed' };
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Failed to login';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        { 
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      setUser(null);
      localStorage.removeItem('token');
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to logout';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = () => {
    return user?.role === USER_ROLES.ADMIN;
  };

  const value = {
    user,
    loading,
    error,
    loginWithGoogle,
    loginWithEmail,
    logout,
    checkAuth,
    isAuthenticated: !!user,
    isAdmin: isAdmin(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
