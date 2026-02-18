"use client";

import { usePathname, useSearchParams } from "next/navigation";

export function useAuthRedirect() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = pathname + (searchParams.size > 0 ? `?${searchParams}` : "");

  const getLoginUrl = () => {
    const params = new URLSearchParams();

    if (currentUrl !== "/auth/login") {
      params.set("returnUrl", currentUrl);
    }
    return `/auth/login?${params}`;
  };

  return { getLoginUrl };
}