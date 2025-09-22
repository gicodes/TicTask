import styles from "./page.module.css";
import CTA from "@/components/index/cta";
import FAQ from "@/components/index/faq";
import Hero from "@/components/index/hero";
import Footer from "@/components/index/footer";
import IndexPitch from "@/components/index/pitch";
import Features from "@/components/index/features";
import ProPlatform from "@/components/index/platforms";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <Hero />
        </div>
        <div className={styles.demoDisplay}>
          {/* display a still picture of the dashboard area in clear, responsive HD image */}
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
