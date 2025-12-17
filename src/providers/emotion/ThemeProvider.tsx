'use client';

import { useState } from 'react';
import { createEmotionCache } from './cache';
import { CacheProvider } from '@emotion/react';

export default function EmotionCacheProvider({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => createEmotionCache());
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
