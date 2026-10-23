import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://tictask.org';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/product', '/resources', '/company', '/auth/login', '/auth/join'],
      disallow: [
        '/dashboard',
        '/api',
        '/auth/reset-password',
        '/auth/verify',
      ],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}