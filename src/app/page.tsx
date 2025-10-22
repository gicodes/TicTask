import styles from "./page.module.css";
import CTA from "@/components/_landing/cta";
import FAQ from "@/components/_landing/faq";
import Hero from "@/components/_landing/hero";
import Footer from "@/components/_landing/footer";
import IndexPitch from "@/components/_landing/pitch";
import Features from "@/components/_landing/features";
import ProPlatform from "@/components/_landing/platforms";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <Hero />
        </div>
        <div className={styles.demoDisplay}>
          {/* display animated media of the user flow or onboarding */}
        </div>
        <div className={styles.IndexPitch}>
          <IndexPitch />
        </div>
        <div className={styles.proPlatforms}>
          <ProPlatform />
        </div>
        <div className={styles.features}>
          <Features />
        </div>
        <div className={styles.faqSection}>
          <FAQ />
        </div>
        <div className={styles.ctaSection}>
          <CTA />
        </div>
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
