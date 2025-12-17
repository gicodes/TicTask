'use client';

import { SessionProvider, useSession, signIn, signOut, SignInResponse } from 'next-auth/react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Role, UserType, UserPreferences } from '@/types/users';
import { Subscription } from '@/types/subscription';
import { AppEvents } from './events';

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
  data?: UserPreferences
}

interface LoginProps {
  email: string, 
  password: string, 
  provider?: string, 
  ip?: string, 
  device?: string,
  returnUrl?: string,
}

interface AuthContextProps {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
  isBusiness: boolean;
  login: ({ email, password,  provider, ip, device, returnUrl }: LoginProps) => Promise<SignInResponse | void>;
  notifyNewDevice: (email: string, device: string, ip?: string) => Promise<void>;
  changeRole: (email: string, fromRole: string, toRole: string, changedBy?: string) => Promise<void>;
  inviteUser: (email: string, invitedBy?: string) => Promise<void>;
  removeUser: (email: string, removedBy?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthInnerProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status, update } = useSession();
  const [ user, setUser ] = useState<AuthUser | null>(null);
  const loading = status === 'loading';
  const isAuthenticated = !!session?.user;

  useEffect(() => {
    if (!session?.user) {
      setUser(null);
      return;
    }

    const sUser = session.user as AuthUser;

    setUser({
      id: session.user.id as number, 
      name: sUser.name || 'Untitled User', 
      email: sUser.email || '', 
      role: sUser.role || 'USER', 
      userType: sUser.userType || 'PERSONAL', 
      photo: sUser.photo, 
      position: sUser.position, 
      organization: sUser.organization, 
      subscription: sUser.subscription, 
      data: sUser.data,

      accessToken: sUser.accessToken, 
    });
  }, [session]);

  const login = useCallback(async ({
    email,
    password,
    provider = "credentials",
    ip,
    device,
    returnUrl,
  }: LoginProps) => {
    const res = await signIn(provider, {
      redirect: false,
      email,
      password,
      callbackUrl: returnUrl,
    });

    AppEvents.emit("auth:login", {
      email,
      ip,
      device,
      at: Date.now(),
    });

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
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
