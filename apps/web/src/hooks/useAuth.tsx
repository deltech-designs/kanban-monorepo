'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { User } from '@kanban/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; isVerified?: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (email: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  googleLogin: (payload: { email: string; name: string; googleId: string; avatar?: string; credential?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (token: string, password: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Fetch the current user on mount to verify session
  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await apiClient.get<User>('/auth/me');
        if (response.success && response.data) {
          // Normalize Mongoose _id into id if needed
          const u = response.data as any;
          setUser({
            id: u.id || u._id,
            email: u.email,
            name: u.name,
            avatar: u.avatar,
            createdAt: u.createdAt,
            updatedAt: u.updatedAt,
          });
        }
      } catch (err: any) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMe();
  }, []);

  // Router guards for protected vs public routes
  useEffect(() => {
    if (isLoading) return;

    const isAuthRoute = pathname?.startsWith('/auth');
    const isProtected = pathname?.startsWith('/dashboard') || pathname?.startsWith('/workspace');

    if (!user && isProtected) {
      router.push('/auth/login');
    } else if (user && (isAuthRoute || pathname === '/')) {
      router.push('/dashboard/boards');
    }
  }, [user, isLoading, pathname, router]);

  async function login(email: string, password: string) {
    setError(null);
    try {
      const response = await apiClient.post<any>('/auth/login', { email, password });
      if (response.success && response.data) {
        if (response.data.isVerified === false) {
          return { success: true, isVerified: false };
        }
        setUser(response.data);
        router.push('/dashboard/boards');
        return { success: true, isVerified: true };
      }
      return { success: false, error: 'Login failed' };
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
      return { success: false, error: err.message || 'Invalid email or password' };
    }
  }

  async function signup(name: string, email: string, password: string) {
    setError(null);
    try {
      const response = await apiClient.post('/auth/register', { name, email, password });
      if (response.success) {
        return { success: true };
      }
      return { success: false, error: 'Registration failed' };
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      return { success: false, error: err.message || 'Registration failed' };
    }
  }

  async function verifyOtp(email: string, otp: string) {
    setError(null);
    try {
      const response = await apiClient.post<any>('/auth/verify-otp', { email, otp });
      if (response.success && response.data) {
        setUser(response.data);
        router.push('/workspace'); // Go to onboarding after email verification
        return { success: true };
      }
      return { success: false, error: 'OTP verification failed' };
    } catch (err: any) {
      setError(err.message || 'Invalid OTP verification');
      return { success: false, error: err.message || 'Invalid OTP verification' };
    }
  }

  async function googleLogin(payload: { email: string; name: string; googleId: string; avatar?: string; credential?: string }) {
    setError(null);
    try {
      const response = await apiClient.post<any>('/auth/google', payload);
      if (response.success && response.data) {
        setUser(response.data);
        // Direct redirection to onboarding if they are a first-time sign-up, otherwise to boards
        router.push('/dashboard/boards');
        return { success: true };
      }
      return { success: false, error: 'Google authentication failed' };
    } catch (err: any) {
      setError(err.message || 'Google authentication failed');
      return { success: false, error: err.message || 'Google authentication failed' };
    }
  }

  async function logout() {
    try {
      await apiClient.post('/auth/logout');
    } catch (err) {
      console.error('Logout API call failed:', err);
    } finally {
      setUser(null);
      router.push('/auth/login');
    }
  }

  async function forgotPassword(email: string) {
    setError(null);
    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      return { success: response.success };
    } catch (err: any) {
      setError(err.message || 'Failed to request password reset link');
      return { success: false, error: err.message || 'Failed to request password reset link' };
    }
  }

  async function resetPassword(token: string, password: string) {
    setError(null);
    try {
      const response = await apiClient.post('/auth/reset-password', { token, password });
      return { success: response.success };
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
      return { success: false, error: err.message || 'Failed to reset password' };
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        signup,
        verifyOtp,
        googleLogin,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
