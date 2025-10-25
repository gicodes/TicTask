import React from 'react';
import type { Metadata } from 'next';
import CreateBlogPage from '../../_level_2/createBlog';

export const metadata: Metadata = {
  title: "TicTask Resources — Learn, Build, and Grow",
  description: "Join our community in expressing how you feel and enrich our blog",
}

const Page = () => {
  return (
    <CreateBlogPage />
  )
}

export default Page