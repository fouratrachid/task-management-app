'use client';

import { useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { signIn, signUp } from '../api/auth';
import { AuthCredentialsDto } from '../types/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload.email);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const handleSignIn = async (credentials: AuthCredentialsDto) => {
    const { accessToken } = await signIn(credentials);
    localStorage.setItem('token', accessToken);
    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    setUser(payload.email);
  };

  const handleSignUp = async (credentials: AuthCredentialsDto) => {
    await signUp(credentials);
    await handleSignIn(credentials);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}