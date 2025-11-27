'use client';

import { SessionProvider, useSession, signIn, signOut, SignInResponse } from 'next-auth/react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { User, Role, UserType } from '@/types/users';
import { Subscription } from '@/types/subscription';
import { UserProfileRes } from '@/types/axios';
import { AppEvents } from './events';
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
  login: (
    email: string, 
    password: string, 
    provider?: string, 
    ip?: string, 
    device?: string
  ) => Promise<SignInResponse | void>;
  notifyNewDevice: (email: string, device: string, ip?: string) => Promise<void>;
  changeRole: (email: string, fromRole: string, toRole: string, changedBy?: string) => Promise<void>;
  inviteUser: (email: string, invitedBy?: string) => Promise<void>;
  removeUser: (email: string, removedBy?: string) => Promise<void>;
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

  const login = useCallback(async (
    email: string, 
    password: string, 
    provider = 'credentials', 
    ip?: string, 
    device?: string
  ) => {
    const res = await signIn(provider, {
      redirect: false,
      email,
      password,
    });

    AppEvents.emit("auth:login", { email, ip, device, at: Date.now() });

    return res;
  }, []);

  const notifyNewDevice = useCallback(async (email: string, device: string, ip?: string) => {
    AppEvents.emit("auth:new-device", { email, device, ip, at: Date.now() });
  }, []);

  const changeRole = useCallback(async (email: string, fromRole: string, toRole: string, changedBy?: string) => {
    AppEvents.emit("auth:role-changed", { email, fromRole, toRole, changedBy, at: Date.now() });
  }, []);

  const inviteUser = useCallback(async (email: string, invitedBy?: string) => {
    AppEvents.emit("auth:invited", { email, invitedBy, inviteId: "invite_" + Date.now(), at: Date.now() });
  }, []);

  const removeUser = useCallback(async (email: string, removedBy?: string) => {
    AppEvents.emit("auth:removed", { email, removedBy, at: Date.now() });
  }, []);

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
    changeRole,
    notifyNewDevice,
    inviteUser,
    removeUser,
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