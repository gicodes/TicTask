import ProductsPage from '@/components/_level_2/productPage'
import React from 'react';

export const metadata = {
  title: "TicTask Products — Workflows that Flow",
  description:
    "Explore TicTask’s productivity suite: tasks, timelines, and teamwork in perfect sync. Empower your team to plan, track, and collaborate effortlessly.",
  openGraph: {
    title: "TicTask Products — Workflows that Flow",
    description:
      "Plan, organize, and collaborate with TicTask’s suite of connected tools for modern teams.",
    url: "https://tictask.com/products",
    siteName: "TicTask",
    images: [
      {
        url: "https://tictask.com/og/products.png",
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
    images: ["https://tictask.com/og/products.png"],
  },
};

const Page = () => {
  return (
    <ProductsPage />
  )
}

export default Page