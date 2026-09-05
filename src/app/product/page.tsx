import { ProductCTA } from '@/components/_level_2/productPage/CTA'
import { ProductHero } from '@/components/_level_2/productPage/Hero';
import { ProductShowcase } from '@/components/_level_2/productPage/Showcase';
import { ProductFeatures } from '@/components/_level_2/productPage/Features';
import { ProductWorkflow } from '@/components/_level_2/productPage/Workflow';

export const metadata = {
  title: "TicTask Products — Workflows that Flow",
  description:
    "Explore TicTask’s productivity suite: tasks, timelines, and teamwork in perfect sync. Empower your team to plan, track, and collaborate effortlessly.",
  openGraph: {
    title: "TicTask Products — Workflows that Flow",
    description:
      "Plan, organize, and collaborate with TicTask’s suite of connected tools for modern teams.",
    url: "https://tictask.org/products",
    siteName: "TicTask",
    images: [
      {
        url: "https://tictask.org/og/products.png",
        width: 1200,
        height: 630,
        alt: "TicTask Product Overview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TicTask Products — Workflows that Flow",
    description:
      "Everything your team needs to move faster, together.",
    images: ["https://tictask.org/og/products.png"],
  },
};

const Page = () => {
  return (
    <main>
      <ProductHero />
      <ProductWorkflow />
      <ProductFeatures />
      <ProductShowcase />
      <ProductCTA />
    </main>
  )
}

export default Page
