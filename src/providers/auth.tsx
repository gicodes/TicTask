'use client';

import {
  SessionProvider,
  useSession,
  signIn,
  signOut,
} from 'next-auth/react';
import { AppEvents } from './events';
import { createContext, useCallback, useContext } from 'react';
import { AuthContextProps, AuthUser, LoginProps } from '@/types/auth';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider refetchOnWindowFocus>
    <AuthInnerProvider>{children}</AuthInnerProvider>
  </SessionProvider>
);

const AuthInnerProvider = (
  { children }: { children: React.ReactNode }
) => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const isAuthenticated = status === "authenticated" &&
    !!session?.user &&
    !!session?.accessToken;

  const user: AuthUser | null = session?.user ? 
    {
      id: Number(session.user.id),
      name: session.user.name ?? 'Untitled User',
      email: session.user.email ?? '',
      role: session.user.role ?? 'USER',
      userType: session.user.userType ?? 'PERSONAL',
      photo: session.user.photo,
      position: session.user?.position,
      collab: session.user?.collab,
      partner: session.user?.partner,
      organization: session.user?.organization,
      subscription: session.user?.subscription,
      data: session.user.data,
      accessToken: session.accessToken as string,
      pushSubscriptions: session.user?.pushSubscriptions,
    } 
  : null;

  const login = useCallback(
    async ({
      email,
      password,
      provider = 'credentials',
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

      AppEvents.emit('auth:login', {
        email,
        ip,
        device,
        at: Date.now(),
      });

      return res;
    },[]
  );

  const notifyNewDevice = useCallback(
    async (email: string, device: string, ip?: string) => {
      AppEvents.emit('auth:new-device', {
        email,
        device,
        ip,
        at: Date.now(),
      });
    },
    []
  );

  const changeRole = useCallback(
    async (
      email: string,
      fromRole: string,
      toRole: string,
      changedBy?: string
    ) => {
      AppEvents.emit('auth:role-changed', {
        email,
        fromRole,
        toRole,
        changedBy,
        at: Date.now(),
      });
    },
    []
  );

  const inviteUser = useCallback(async (email: string, invitedBy?: string) => {
    AppEvents.emit('auth:invited', {
      email,
      invitedBy,
      inviteId: `invite_${Date.now()}`,
      at: Date.now(),
    });
  }, []);

  const removeUser = useCallback(async (email: string, removedBy?: string) => {
    AppEvents.emit('auth:removed', {
      email,
      removedBy,
      at: Date.now(),
    });
  }, []);

  const logout = async () => {
    await signOut({
      callbackUrl: '/auth/login',
      redirect: true,
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
