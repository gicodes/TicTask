import CompanyPage from '@/components/_level_2/companyPage'
import React from 'react';

export const metadata = {
  title: "About TicTask — The Future of Flow",
  description:
    "Learn about TicTask’s mission, values, and team. We’re building tools that help people and teams work better together — with clarity and calm.",
  openGraph: {
    title: "About TicTask — The Future of Flow",
    description:
      "Meet the TicTask team, explore our values, and see how we’re shaping the future of collaborative work.",
    url: "https://tictask.org/company",
    siteName: "TicTask",
    images: [
      {
        url: "https://tictask.org/og/company.png",
        width: 1200,
        height: 630,
        alt: "About TicTask",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About TicTask — The Future of Flow",
    description:
      "TicTask exists to help people and teams collaborate with clarity and calm.",
    images: ["https://tictask.org/og/company.png"],
  },
};

const Page = () => {
  return (
    <CompanyPage />
  )
}

export default Page