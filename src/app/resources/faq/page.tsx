import type { Metadata } from 'next';
import React from 'react';
import FaqPage from '../_level_3/faqPage';

export const metadata: Metadata = {
  title: "TicTask FAQ — Ask, Learn and be Educated",
  description: "Ask amazing questions and get the chance to feature in our FAQ page",
}

const Page = () => {
  return (
    <FaqPage />
  )
}

export default Page