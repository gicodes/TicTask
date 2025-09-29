"use client";

import * as React from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const cache = React.useMemo(() => {
    const cache = createCache({ key: "css", prepend: true });
    return cache;
  }, []);

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
