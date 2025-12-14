import ResourcePage from '@/app/resources/_level_3'
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "TicTask Resources — Learn, Build, and Grow",
  description:
    "Guides, tutorials, and insights to help you get the most out of TicTask. Learn faster. Build better. Collaborate smarter.",
  openGraph: {
    title: "TicTask Resources — Learn, Build, and Grow",
    description:
      "Explore articles, API docs, and productivity insights from the TicTask team.",
    url: "https://tictask.org/resources",
    siteName: "TicTask",
    images: [
      {
        url: "https://tictask.org/og/resources.png",
        width: 1200,
        height: 630,
        alt: "TicTask Resources",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TicTask Resources — Learn, Build, and Grow",
    description:
      "Articles, documentation, and updates to help you master TicTask.",
    images: ["https://tictask.org/og/resources.png"],
  },
};

const Page = () => {
  return (
    <ResourcePage />
  )
}

export default Page