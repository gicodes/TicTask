import { signOut } from "next-auth/react";

export const handleLogout = (role: 'USER' | 'ADMIN' | 'AGENT') => {
  if (role === 'USER') {
    signOut({ callbackUrl: '/auth/user/login' });
  } else {
    localStorage.removeItem('token');
    window.location.href = `/auth/${role.toLowerCase()}/login`;
  }
};
