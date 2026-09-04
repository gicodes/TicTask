import { ProductCTA } from '@/components/_level_2/productPage/CTA';
import { ProductDemoHero } from '@/components/_level_2/productDemo/DemoHero';
import { ProductWorkflow } from '@/components/_level_2/productDemo/Workflow';
import { ProductFeatures } from '@/components/_level_2/productDemo/Features';
import { ProductEducation } from '@/components/_level_2/productDemo/Education';

export const metadata = {
  title: 'TicTask — See How Work Flows',
  description:
    'See how TicTask turns everyday work into clear, connected workflows. Explore tasks, projects, timelines, collaboration and more.',
  openGraph: {
    title: 'TicTask — See How Work Flows',
    description:
      'Explore TicTask through interactive product demos, workflows and practical guides.',
    url: 'https://tictask.org/product',
    siteName: 'TicTask',
    images: [
      {
        url: 'https://tictask.org/og/products.png',
        width: 1200,
        height: 630,
        alt: 'TicTask Product',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TicTask — See How Work Flows',
    description:
      'Explore TicTask through interactive product demos and workflows.',
    images: ['https://tictask.org/og/products.png'],
  },
};

const Page = () => {
  return (
    <main>
      <ProductDemoHero />
      <ProductWorkflow />
      <ProductFeatures />
      {/* <ProductEducation /> */}
      {/* <ProductCTA /> */}
    </main>
  );
};

export default Page;