'use client';

import { CacheProvider } from '@emotion/react';
import { emotionCache } from './createEmotionCache';

export default function EmotionProvider({ children }: { children: React.ReactNode }) {
  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
}
