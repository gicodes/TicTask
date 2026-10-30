import styles from "./page.module.css";

import type { Metadata } from 'next';
import CTA from "@/components/_landing/cta";
import FAQ from "@/components/_landing/faq";
import Hero from "@/components/_landing/hero";
import Demo from "@/components/_landing/demo";
import Footer from "@/components/_landing/footer";
import Pricing from "@/components/_landing/pricing";
import IndexPitch from "@/components/_landing/pitch";
import Features from "@/components/_landing/features";
import IndexInsight from "@/components/_landing/insight";
import { Workflows } from "@/components/_landing/outcomes";
import { Ecosystem } from "@/components/_landing/ecosystem";
import { Voices } from "@/components/_landing/testimonials";
import { IndexMarketing } from "../components/_landing/marketing";
import { WorkspaceFlowAnimation } from "@/components/_landing/animatedFlow";

export const metadata: Metadata = {
  title: "TicTask — Ticket and task management you can use",
  description:
    "Create tickets, collaborate on projects and share experiences in one platform.",
  openGraph: {
    title: "TicTask Home: All-in-one professional workspace",
    description:
      "Explore the product and benefits of owning a workspace.",
    url: "https://tictask.org/",
    siteName: "TicTask",
    images: [
      {
        url: "https://tictask.org/product/product.jpg",
        width: 1200,
        height: 630,
        alt: "TicTask Home",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TicTask Home: All-in-one professional workspace",
    description:
      "Articles, documentation, and updates to help you master TicTask.",
    images: ["https://tictask.org/product/product.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.hero}>
            <Hero />
          </div>
          <div className={styles.indexPitch}>
            <IndexPitch />
          </div>
        </main>
      </div>

      <div className={styles.page2b}>
        <main>
          <div className={styles.animationFlow}>
            <WorkspaceFlowAnimation />    
          </div>
        </main>
      </div>

      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.coreFeatures}>
            <div className={styles.insight}>
              <IndexInsight />
            </div>
            <div className={styles.features}>
              <Features />
            </div>
          </div>

          <div className={styles.ProFeatures}>
            <div className={styles.marketing}>
              <IndexMarketing />
            </div>
            <div className={styles.howTeamsRun}>
              <Workflows />
            </div>
          </div>
        </main>
      </div>

      <div className={styles.page3}>
        <main className={styles.main}>
          <div className={styles.demo}>
            <div className={styles.demoDisplay}>
              <Demo />
            </div>
          </div>
        </main>
      </div>

      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.product}>
            <Ecosystem />
            <Voices />
            <Pricing />
          </div>

          <div className={styles.faqSection}>
            <FAQ />
          </div>

          <div className={styles.ctaSection}>
            <CTA />
          </div>
        </main>
      </div>
      
      <div className={styles.page2}>
        <main className={styles.main}>
          <footer className={styles.footer}>
            <Footer />
          </footer>
        </main>
      </div>
    </>
  );
}
