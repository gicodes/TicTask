'use client';

import { SessionProvider, useSession, signIn, signOut } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Role, UserType, Subscription } from '@/types/users';
import { UserProfileRes } from '@/types/axios';
import { apiGet } from '@/lib/api';

export interface AuthUser {
  id: number;
  role: Role;
  name: string;
  email: string;
  userType?: UserType;
  photo?: string;
  collab?: boolean;
  partner?: boolean;
  position?: string;
  organization?: string;
  accessToken: string;
  subscription?: Subscription;
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
  const [ user, setUser ] = useState<AuthUser | null>(null);

  const loading = status === 'loading';
  const isAuthenticated = !!session?.user;

  useEffect(() => {
    if (session?.user) {
      const fetchUser = async () => {
        const res: UserProfileRes = await apiGet(`/user/${((session.user) as User).id}`);
        
        setUser({
          id: ((session.user) as User).id,
          name: res.data.name || '',
          email: res.data.email || '',
          role: ((res.data) as User).role || 'USER',
          userType: ((res.data) as User).userType || '',
          photo: ((res.data) as User).photo,
          position:  ((res.data) as User).position,
          organization: ((res.data) as User).organization,
          accessToken: ((res.data) as User).accessToken,
          subscription: ((res.data) as User).subscription
        });
        return;
      }

      fetchUser();
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