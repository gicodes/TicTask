import ResourcePage from '@/components/_level_2/resourcesPage'
import React from 'react';

export const metadata = {
  title: "TicTask Resources — Learn, Build, and Grow",
  description:
    "Guides, tutorials, and insights to help you get the most out of TicTask. Learn faster. Build better. Collaborate smarter.",
  openGraph: {
    title: "TicTask Resources — Learn, Build, and Grow",
    description:
      "Explore articles, API docs, and productivity insights from the TicTask team.",
    url: "https://tictask.com/resources",
    siteName: "TicTask",
    images: [
      {
        url: "https://tictask.com/og/resources.png",
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
    images: ["https://tictask.com/og/resources.png"],
  },
};

const Page = () => {
  return (
    <ResourcePage />
  )
}

export default Page