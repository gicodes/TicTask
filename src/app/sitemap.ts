import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://tictask.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/product', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/product/pricing', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/resources', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/resources/docs', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/resources/docs/tour', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/resources/faq', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/resources/blog', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/resources/templates', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/resources/changelog', priority: 0.6, changeFrequency: 'weekly' as const },
    { path: '/resources/docs/dev', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/company', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/auth/login', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/auth/join/user', priority: 0.5, changeFrequency: 'yearly' as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}