import styles from "@/app/page.module.css";

const Hero = () => {
  return (
    <>
      <div className={styles.heroTitle}>
        <h2>Ticket <span className="font-xl">&</span> Task Management System</h2>
        <h2><span className="custom-warm">Driven by AI</span>, Designed for Everyone</h2>
      </div>
      <div className={styles.heroSubtitle}>
        TicTask is a ticket and task management system that leverages the application of the true concepts and principles of SWE to streamline your workflow and boost
        productivity. Whether you&apos;re a small team or a large enterprise, TicTask
        is designed to meet your needs with its intuitive interface and robust
        features.
      </div>
      <div className={styles.heroActions}>
        <div className={styles.btnGroup}>
          <button className={styles.btnPrimary}> Start free trial </button>
          <button className={styles.btnSecondary}> Watch demo video </button>
        </div>
        <p className={styles.trialText}>
          14-day free trial. No credit card required.
        </p>
      </div>
    </>
  )
}

export default Hero;
