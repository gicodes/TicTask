'use client';

import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache } from './cache';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [cache] = React.useState(() => createEmotionCache());
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
