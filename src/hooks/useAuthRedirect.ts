"use client";

import { signIn, signOut } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";

export function useAuthRedirect() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentUrl =
    pathname +
    (searchParams.toString() ? `?${searchParams.toString()}` : "");

  const login = () =>
    signIn(undefined, {
      callbackUrl: currentUrl,
    });

  const logout = () =>
    signOut({
      callbackUrl: currentUrl,
    });

  return { login, logout };
}
