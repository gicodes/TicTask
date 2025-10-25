import React from 'react';
import type { Metadata } from 'next';
import CreateBlogPage from '../../_level_2/createBlog';

export const metadata: Metadata = {
  title: "TicTask Resources — Learn, Build, and Grow",
  description: "Write insights and stories that educates and entertain the TicTask Community",
}

const Page = () => {
  return (
    <CreateBlogPage />
  )
}

export default Page