'use client';

import { SessionProvider, useSession, signIn, signOut } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Role, UserType } from '@/types/users';

export interface AuthUser {
  id: number;
  role: Role;
  name: string;
  email: string;
  userType?: UserType;
  photo?: string;
  collab?: boolean;
  partner?: boolean;
  organization?: string;
}

interface AuthContextProps {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
  isBusiness: boolean;
  login: (provider?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthInnerProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status, update } = useSession();
  const [user, setUser] = useState<AuthUser | null>(null);

  const loading = status === 'loading';
  const isAuthenticated = !!session?.user;

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: ((session.user as unknown) as User).id,
        name: session.user.name || '',
        email: session.user.email || '',
        role: ((session.user as unknown) as User).role || 'USER',
        userType: ((session.user as unknown) as User).userType || 'PERSONAL',
        photo: ((session.user as unknown) as User).photo,
        organization: ((session.user as unknown) as User).organization,
      });
    } else {
      setUser(null);
    }
  }, [session]);

  const login = async (provider = 'credentials') => {
    await signIn(provider);
  };

  const logout = async () => {
    await signOut({ 
      callbackUrl: '/auth/login', 
      redirect: true 
    });
  };

  const refreshUser = async () => {
    await update(); 
  };

  const value: AuthContextProps = {
    user,
    loading,
    isAuthenticated,
    isAdmin: user?.role === 'ADMIN',
    isUser: user?.role === 'USER',
    isBusiness: user?.userType === 'BUSINESS',
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider refetchOnWindowFocus={true}>
      <AuthInnerProvider>{children}</AuthInnerProvider>
    </SessionProvider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
